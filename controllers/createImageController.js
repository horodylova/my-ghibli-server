import axios from "axios";
import createImagePrompt from "../utils/createImagePrompt.js";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const uploadMiddleware = upload.single("image");

export const createImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "Image file is required"
    });
  }
  
  const { style, mood } = req.body;
    
  try {
    const imagePath = req.file.path;
        
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
 
    const visionResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
                Describe in detail what is shown in this photograph. Include information about the people, what race or ethnicity? Identify each person in the photo and describe separately, their gender (IMPORTANT). Indicate the direction of their gaze, are they looking directly at the camera? What is their hair style, or are they bald? If any, what colour is their hair. Details of appearance? Pay attention to facial expressions, broad smiles or other facial expressions. Are their teeth visible? What are they doing in the picture, what poses are they taking. Are they holding something in their hands?  What is surrounding them? Where are they located? Identify the background, colours and overall composition, inscriptions and their location. Indicate objects, special details, their colours. Indicate animals if present, their breeds, their colours. What are the animals doing? What are their poses? Be specific and objective. In your text, you should convey as accurately as possible what is depicted in the photograph, and nothing more.`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
        
    const visionTokens = visionResponse.data.usage;
    const imageDescription = visionResponse.data.choices[0].message.content;
    
    if (imageDescription.includes("cannot describe") || 
        imageDescription.includes("I'm sorry") || 
        imageDescription.includes("content guidelines")) {
      fs.unlinkSync(imagePath);
      return res.status(400).json({
        error: "Unable to process this image due to content guidelines",
        details: "The image may contain content that violates our terms of service."
      });
    }
    
    const prompt = createImagePrompt({
      scene: imageDescription,
      style: style || '',
      mood: mood || '',
      detailed: true
    });

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"  
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      imageUrl: response.data.data[0].url,
      prompt: prompt,
      imageDescription: imageDescription,
      tokenUsage: visionTokens
    });
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
        
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
        
    res.status(500).json({ 
      error: "Failed to generate image",
      details: error.response?.data?.error?.message || error.message
    });
  }
};