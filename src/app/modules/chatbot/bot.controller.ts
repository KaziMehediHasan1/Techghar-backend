import { botService } from "@/app/modules/chatbot/bot.service.js";
import config from "@/config/index.js";
import catchAsync from "@/utils/catchAsync.js";

const handleBotChat = catchAsync(async (req, res) => {
  const { messages } = req.body;
  const threadId = req.params.threadId as string;
  const lastUserMessage = messages[messages.length - 1].content;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    const eventStream = await botService.handleBotChat(
      lastUserMessage,
      threadId,
    );


    for await (const chunk of eventStream) {
      // LangGraph messages mode এ chunk = [AIMessageChunk, metadata]
      const messageChunk = Array.isArray(chunk) ? chunk[0] : chunk;

      // Skip tool call chunks এবং non-AI messages
      if (!messageChunk || messageChunk._getType?.() !== "ai") continue;

      // content string বা array হতে পারে (Gemini quirk)
      let text = "";
      if (typeof messageChunk.content === "string") {
        text = messageChunk.content;
      } else if (Array.isArray(messageChunk.content)) {
        text = messageChunk.content
          .filter((c: any) => c.type === "text")
          .map((c: any) => c.text)
          .join("");
      }

      // Tool call chunks skip করো (content empty থাকে)
      if (text) {
        res.write(text);
      }
    }
    // res.write(`d:{"finishReason":"stop"}\n`);
  } catch (error) {
    console.error("Streaming Error:", error);
    res.write(`${JSON.stringify("দুঃখিত, সার্ভারে সমস্যা হচ্ছে।")}\n`);
  } finally {
    res.end();
  }
});
export const botController = {
  handleBotChat,
};
