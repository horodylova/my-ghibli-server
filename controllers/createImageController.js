import axios from "axios";

export const createImage = async (req, res) => {
    const { input } = req.body;

    if (!input || typeof input !== 'string') {
        return res.status(400).json({
            error: "Input text is required and must be a string"
        });
    }

    try {
         const response = await axios.post("API_URL", { input });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};