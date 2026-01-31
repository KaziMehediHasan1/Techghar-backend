import config from "@/config/index.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: config.ai.apiKey,
});

export const OpenAIRes = async (message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "you are assistant for e-commerce user" },
      { role: "user", content: message },
    ],
  });
  return response.choices[0].message;
};
