import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",

            content:
              "You are ElanceForge AI assistant. Help users with websites, SEO, branding, digital marketing, development and business growth.",
          },

          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    return res.status(200).json({
      success: true,

      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(
      "Groq Error :",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
});

export default router;