import { botService } from "@/app/modules/chatbot/bot.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const handleBotChat = catchAsync(async (req, res) => {
  const message = req.body.message;
  const threadId = req.params.threadId as string;
  //   Generate unique thread id using current time
  //   const threadId = Date.now().toString();
  console.log(message, threadId, "check message");

  const result = await botService.handleBotChat(message, threadId);
  sendResponse(res, {
    statusCode: 200,
    message: "Success",
    success: true,
    data: result,
  });
});

export const botController = {
  handleBotChat,
};
