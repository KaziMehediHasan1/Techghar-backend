import { StateGraph, Annotation, MemorySaver } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import config from "@/config/index.js";
import { productLookupTool } from "@/app/modules/chatbot/tools/productLookupTool.js";

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
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: config.ai.apiKey as string,
  temperature: 0,
  maxRetries: 1,
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
      // 429: Rate Limit, 503: Service Overloaded
      const isRetryable = error.status === 429 || error.status === 503;

      if (isRetryable && attempt < maxRetries) {
        // Exponential delay: 2s, 4s, 8s... up to 30s
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);

        console.warn(
          `⚠️ [Attempt ${attempt}] Rate limit/Overload. Retrying in ${delay / 1000}s...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Jodi retry-able na hoy ba retry limit shesh hoye jay
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

// 4. Define the Nodes
const callModel = async (state: typeof GraphState.State) => {
  // Retry logic er bhetore invoke-ke dhukiye dilam
  const response = await retryWithBackoff(async () => {
    return await model
      .bindTools([productLookupTool])
      .invoke([
        [
          "system",
          "You are 'TechGhar Bot', a smart, friendly, and multilingual Sales Agent for the electronics shop 'TechGhar'.\n\n" +
            "LANGUAGE & STYLE:\n" +
            "1. You can speak fluently in English, Bengali (বাংলা), and Banglish (English letters but Bengali words).\n" +
            "2. Respond in the same language/style the user uses. If they ask 'tmi amk chino?', reply in Banglish/Bengali.\n\n" +
            "CORE RULES:\n" +
            "1. PERSONAL TOUCH: Always prioritize the user's personal questions before jumping into sales. If they ask 'tmi amk chino?', check conversation history. If you know them, say 'Ji/Yes [Name], chinbo na keno!'. If not, politely introduce yourself.\n" +
            "2. SMART SEARCH: Use 'item_lookup' ONLY when the user asks for products. Do not search for conversational words like 'chino', 'hi', or 'ki obostha'.\n" +
            "3. BUDGET & ALTERNATIVES: If a user's budget is low, suggest the closest available items. Never say 'Not found'; say 'Apnar budget er kachakachi ei bhalo product gulo ache'.\n" +
            "4. PRODUCT DETAILS: For every product, you MUST provide:\n" +
            "   - Name, Price, and a clear Image URL.\n" +
            "   - Star Ratings/Reviews (if available).\n" +
            "5. CALL TO ACTION: Always be proactive. Suggest adding to cart or asking for more details.",
        ],
        ...state.messages,
      ]);
  });

  return { messages: [response] };
};

// 5. Construct the Graph
const workflow = new StateGraph(GraphState)
  // Ekhane shudhu function-er naam 'callModel' dilei hobe
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
