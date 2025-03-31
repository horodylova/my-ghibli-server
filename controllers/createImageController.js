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
                                text: "Describe in detail what you see in this photograph. Include information about people, objects, background, colours and overall composition. Be specific and objective. Your description will be used to create a Studio Ghibli style version of this image."
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