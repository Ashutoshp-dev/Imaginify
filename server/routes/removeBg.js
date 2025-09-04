import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const imgResponse = await fetch(imageUrl);
    if (!imgResponse.ok) {
      return res.status(400).json({ error: "Failed to fetch image" });
    }
    const buffer = Buffer.from(await imgResponse.arrayBuffer());

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", new Blob([buffer]), "image.png");


    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
  console.error("Remove.bg API error:", errText);
      return res.status(500).json({ error: errText });
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());

    res.json({
      noBgImage: `data:image/png;base64,${resultBuffer.toString("base64")}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Remove.bg failed" });
  }
});

export default router;
