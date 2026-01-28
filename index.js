const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("AI Proxy is alive.");
});
app.post("/hf", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: `You are a friendly AI. ${userMessage}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_KEY}`
        }
      }
    );

    const output = response.data[0]?.generated_text || "No response.";
    res.json({ text: output });
  } catch (err) {
    console.error("HF error:", err.message);
    res.json({ text: "No response." });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
