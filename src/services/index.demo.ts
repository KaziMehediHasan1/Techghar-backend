import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Request, Response } from "express";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateProductFromImage = async (req: Request, res: Response) => {
  const { imageBase64 } = req.body; // Frontend theke image pathano

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Analyze this product image. Generate a professional JSON response with: 'name', 'title', 'description' (SEO friendly), and 'category'.";

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: imageBase64, mimeType: "image/jpeg" } },
    ]);

    const response = await result.response;
    const text = response.text();
    const generateText = JSON.parse(text);
    console.log(generateText, "generated text data....1");

    // JSON response parse koro
    res.status(200).json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: "AI failed to analyze image" });
  }
};
