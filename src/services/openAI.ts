import config from "@/config/index.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: config.ai.apiKey,
});


