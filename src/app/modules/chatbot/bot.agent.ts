import { StateGraph, Annotation, MemorySaver } from "@langchain/langgraph";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import config from "@/config/index.js";
import { productLookupTool } from "./tools/productLookupTool.js";

// 1. Define the State (Memory)
const GraphState = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
  }),
});

// 2. Define the Tools
const tools = [productLookupTool];
const toolNode = new ToolNode(tools);

// 3. Initialize the Model and Bind Tools
// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash",
//   apiKey: config.ai.apiKey as string,
//   temperature: 0,
//   maxRetries: 1,
//   streaming: true,
// });

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey: config.ai.GORQAPIKey as string,
  temperature: 0,
});

/**
 * Retries a function with exponential backoff on rate limit or server errors.
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRetryable = error.status === 429 || error.status === 503;

      if (isRetryable && attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

const callModel = async (state: typeof GraphState.State) => {
  const response = await retryWithBackoff(async () => {
    return await model
      .bindTools([productLookupTool])
      .invoke([
        [
          "system",
          "You are Neo AI, a smart multilingual sales agent for TechGhar electronics shop.\n\n" +
            "LANGUAGE: Always reply in the same language the user uses (Bengali, Banglish, or English).\n\n" +
            "TOOL USAGE RULES:\n" +
            "- ALWAYS call item_lookup tool FIRST for any product-related query. No exceptions.\n" +
            "- Extract the best search keyword from user's message:\n" +
            "  · 'MSI laptop dao' → item_lookup('MSI laptop')\n" +
            "  · 'gaming monitor 144hz' → item_lookup('gaming monitor 144hz')\n" +
            "  · '20000 taka te phone' → item_lookup('phone')\n" +
            "  · 'ভালো ল্যাপটপ চাই' → item_lookup('laptop')\n" +
            "  · 'wireless keyboard' → item_lookup('wireless keyboard')\n" +
            "- NEVER ask the user for more info before calling the tool. Search first, filter after.\n" +
            "- For greetings only (hi, hello, kmn acho, sালাম) → NO tool call needed.\n\n" +
            "AFTER TOOL RETURNS DATA:\n" +
            "- Show each product clearly with: Name, Brand, Price (finalPrice), Stock status, Rating, Image (images[0]).\n" +
            "- If user mentioned a budget, filter results by finalPrice.\n" +
            "- If no products found → say 'এই মুহূর্তে স্টকে নেই, অন্য কিছু খুঁজি?'\n" +
            "- Always end with a call to action: 'Cart এ add করবো? নাকি আরো details চাও?'\n\n" +
            "CONVERSATION:\n" +
            "- Remember previous messages in the conversation.\n" +
            "- If user follows up ('এটার price কত?', 'আরো দেখাও') → use context from previous messages to search again.",
        ],
        ...state.messages,
      ]);
  });

  return { messages: [response] };
};

// 5. Construct the Graph
const workflow = new StateGraph(GraphState)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", (state) => {
    const lastMsg = state.messages[state.messages.length - 1];
    return lastMsg.tool_calls?.length ? "tools" : "__end__";
  })
  .addEdge("tools", "agent");

const memory = new MemorySaver();
export const agent = workflow.compile({ checkpointer: memory });
