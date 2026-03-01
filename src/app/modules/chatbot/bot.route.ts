import { botServices } from "@/app/modules/aibot/bot.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createBotConversation = catchAsync(async (req, res) => {
  const initialMessage = req.body.message;
  //   Generate unique thread id using current time
  const threadId = Date.now().toString();
  console.log(initialMessage, "check initialMessage");

  const result = await botServices.createBotConversation(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "blog created successfully",
    success: true,
    data: result,
  });
});

export const botController = {
  createBotConversation,
};
