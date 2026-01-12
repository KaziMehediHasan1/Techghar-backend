import { SUCCESS_MESSAGES } from "@/src/constants/successMessages.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { reviewService } from "./review.service.js";

const reviewPostController = catchAsync(async (req, res) => {
  const result = await reviewService.reviewPostService(req.body);
  // console.log(result, "check data is come?");
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.created.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.created.message,
    data: result,
  });
});

export const reviewController = {
  reviewPostController,
};
