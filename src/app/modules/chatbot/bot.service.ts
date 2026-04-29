// bot.service.ts
import { agent } from "@/app/modules/chatbot/bot.agent.js";
import { HumanMessage } from "@langchain/core/messages";

const handleBotChat = async (messages: string, threadId: string) => {
  const config = { configurable: { thread_id: threadId } };

  return agent.stream(
    {
      messages: [new HumanMessage(messages)],
    },
    {
      ...config,
      streamMode: "messages",
      recursionLimit: 10,
    },
  );
};

export const botService = {
  handleBotChat,
};
