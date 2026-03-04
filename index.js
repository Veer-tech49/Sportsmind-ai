import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are SportsMind AI. Answer ONLY cricket & football questions with stats, predictions, and insights." },
          { role: "user", content: question }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Error fetching AI answer" });
  }
});

app.listen(3000, () => console.log("Server running..."));
