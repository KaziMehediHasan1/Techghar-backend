// bot.service.ts
import { agent } from "@/app/modules/chatbot/bot.agent.js";
import { HumanMessage } from "@langchain/core/messages";

const handleBotChat = async (message: string, userId: string) => {
  const config = { configurable: { thread_id: userId } };

  const result = await agent.invoke(
    {
      messages: [new HumanMessage(message)],
    },
    config,
  );

  const lastMessage = result.messages[result.messages.length - 1];
  return lastMessage.content;
};

export const botService = {
  handleBotChat,
};
