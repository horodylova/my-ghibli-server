import axios from "axios";
import createImagePrompt from "../utils/createImagePrompt.js";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: fileFilter
});

export const uploadMiddleware = upload.single("image");

export const createImage = async (req, res) => {
  let imagePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required"
      });
    }
    
    imagePath = req.file.path;
    const { style = 'pixar', mood = 'natural' } = req.body;
    
 
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    
    const descriptionPrompt = `
      Describe this photograph in extensive detail. Your photo description must fit within 2000 characters. Include:
      - Each person: appearance, race/ethnicity, gender, age range, hair style and color, clothing, facial expression, gaze direction, pose, and position
      - Background elements: setting, environment, colors, lighting
      - Any objects: position, color, size, and relevance
      - Any animals: breed, color, position, and behavior
      - Spatial relationships: how elements are positioned relative to each other
      - Overall composition and framing
      Be objective, specific, and thorough. Focus only on what is visibly present in the image.
    `;
    
    console.log("Requesting image description...");
    const visionResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "GPT-4.1",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: descriptionPrompt },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` }
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
        imageDescription.includes("content guidelines") ||
        imageDescription.includes("policy violation")) {
      
      return res.status(400).json({
        error: "Unable to process this image due to content guidelines",
        details: "The image may contain content that violates our terms of service."
      });
    }
    

    console.log("Creating image generation prompt...");
    const prompt = createImagePrompt({
      scene: imageDescription,
      style,
      mood,
      detailed: true
    });
 
    console.log("Requesting image generation...");
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

    res.json({
      success: true,
      imageUrl: response.data.data[0].url,
      prompt,
      imageDescription,
      tokenUsage: visionTokens,
      style,
      mood
    });
    
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    
    
    const errorDetails = {
      message: error.message,
      statusCode: error.response?.status,
      apiError: error.response?.data?.error?.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
    
    res.status(error.response?.status || 500).json({ 
      error: "Failed to generate image",
      details: errorDetails
    });
  } finally {
  
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};
