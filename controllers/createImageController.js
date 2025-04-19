import axios from "axios";
import createImageUtils from "../utils/createImagePrompt.js";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const { createImagePrompt, DEFAULT_STYLE, DEFAULT_MOOD } = createImageUtils;
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
    const { style = DEFAULT_STYLE, mood = DEFAULT_MOOD } = req.body;
    
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    
    const descriptionPrompt = `
      Create a precise and factual description of this image for artistic recreation.
      
      Rules:
      1. Describe ONLY what you can actually see
      2. NEVER invent or assume details not visible in the image
      3. Be absolutely accurate about physical characteristics
      4. Note exact positions, poses, expressions, and spatial relationships
      5. For complex scenes, prioritize describing main subjects first
      
      For any people present:
      - Describe exact appearance (baldness/hair, facial features, body type)
      - Specify precise age range, clothing, expression, gaze direction
      - Note exact positioning and posture
      
      For backgrounds:
      - Describe precise setting/environment with accurate colors
      - Note lighting conditions and atmosphere
      
      For any animals, objects, or other elements:
      - Describe exact appearance, position, and relationship to other elements
      
      Your description must be factual and under 2000 characters.
    `;
    
    console.log("Requesting image description...");
    const visionResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a precise image analyst with forensic attention to detail. Your job is to create factual descriptions for artistic reproduction. You must never invent details, and you must describe exactly what is visible with scientific accuracy."
          },
          {
            role: "user",
            content: [
              { type: "text", text: descriptionPrompt },
              {
                type: "image_url",
                image_url: { 
                  url: `data:image/jpeg;base64,${base64Image}`,
                  detail: "high"
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