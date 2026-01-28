import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/hf", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const hfResponse = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: userMessage })
            }
        );

        const data = await hfResponse.json();

        res.json({
            text: data[0]?.generated_text || "No response."
        });

    } catch (err) {
        res.json({ text: "Server error." });
    }
});

app.listen(3000, () => console.log("Server running"));
