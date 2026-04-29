import { StateGraph, Annotation, MemorySaver } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import config from "@/config/index.js";
import { productLookupTool } from "./tools/productLookupTool.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 1. Define the State (Memory)
const GraphState = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
  }),
});

// 2. Define the Tools
const tools = [productLookupTool];
const toolNode = new ToolNode(tools);

const mainModel = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  apiKey: config.ai.GORQAPIKey as string,
  temperature: 0,
});

// ২. প্রথম ব্যাকআপ (Google Gemini)
const fallbackModel1 = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: config.ai.GeminiAPIKey as string,
  temperature: 0,
});

// ৩. দ্বিতীয় ব্যাকআপ (Groq - Mixtral)
const fallbackModel2 = new ChatGroq({
  model: "llama-3-8b-8192-context-mixtral",
  apiKey: config.ai.GORQAPIKey as string,
  temperature: 0,
});

// ফলব্যাক চেইন তৈরি
const modelWithFallback = mainModel
  .bindTools([productLookupTool])
  .withFallbacks({
    fallbacks: [
      fallbackModel1.bindTools([productLookupTool]),
      fallbackModel2.bindTools([productLookupTool]),
    ],
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
    return await modelWithFallback.invoke([
      [
        "system",
        "You are Neo AI, the friendly polyglot sales agent for TechGhar. Expert in all languages (including Banglish).\n\n" +
          "CORE PROTOCOLS:\n" +
          "- Match user's language/script perfectly. Adopt cultural politeness.\n" +
          "- Call `item_lookup` for any product query. Use English for tool keywords, but reply in user's language.\n" +
          "- Be a warm consultant. End with a discovery question (e.g., 'What is your budget?').\n\n" +
          "PRODUCT DISPLAY (STRICT MARKDOWN):\n" +
          "### **Product Name**\n" +
          "\n![alt]({image_url})\n\n" +
          "- **Brand:** {brand}\n" +
          "- **Price:** {finalPrice} BDT\n" +
          "- **Highlights:** {Translate key features}\n" +
          "- **Rating:** {averageRating} ⭐\n\n" +
          "INTERACTIVE ELEMENTS:\n" +
          "- Always provide 2-3 localized buttons in square brackets: [Add to Cart 🛒] [More Details 🔍].\n" +
          "- Mirror user's language for button text (e.g., Bengali: [কার্টে যোগ করুন 🛒]).\n\n" +
          "CONTEXT:\n" +
          "- Maintain history and adapt if the user switches languages mid-chat.",
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
