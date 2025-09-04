import express from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E route!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt, size } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const aiResponse = await openai.images.generate({
          model: "gpt-image-1",
          prompt,
          size: size || "1024x1024"
        });
        
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: `data:image/png;base64,${image}` });
    } catch (error) {
      console.error("Error generating image:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to generate image: " + error.message });
    }
})

export default router;