import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);
console.log(process.env.GROQ_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());
console.log("KEY EXISTS:", !!process.env.GROQ_API_KEY);
console.log("KEY PREFIX:", process.env.GROQ_API_KEY?.slice(0, 8));

app.post("/generate", async (req, res) => {
  try {
    const {
      role,
      company,
      description,
      target,
      count,
      tone,
    } = req.body;

    if (!description?.trim()) {
      return res.status(400).json({
        error: "Description is required",
      });
    }

    const prompt = `You are an expert resume writer. Write ${count} powerful resume bullet points.

Role: ${role || "Not specified"}
Company / Project: ${company || "Not specified"}
Target role: ${target || "General tech/software role"}
Tone: ${tone}

What the candidate did:
"${description}"

Rules:
- Start each bullet with a strong action verb
- ATS friendly
- Professional
- One bullet per line
- No numbering
- No symbols
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [
            {
              role: "system",
              content:
                "You are an expert resume writer. Return only bullet points.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message);
    }

    const raw = data.choices[0].message.content;

    const bullets = raw
      .split("\n")
      .map((line) =>
        line.replace(/^[•\-\*\d\.]\s*/, "").trim()
      )
      .filter(Boolean);

    res.json({ bullets });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});