import { SUCCESS_MESSAGES } from "@/src/constants/successMessages.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { reviewService } from "./review.service.js";

const createReviewController = catchAsync(async (req, res) => {
  const result = await reviewService.reviewPostService(req.body);
  // console.log(result, "check data is come?");
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.created.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.created.message,
    data: result,
  });
});

const getAllReviewsController = catchAsync(async (_, res) => {
  const result = await reviewService.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.fetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.fetched.message,
    data: result,
  });
});

const getSingleReviewController = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id,"idddd cehcc")
  const result = await reviewService.getSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.fetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.fetched.message,
    data: result,
  });
});



export const reviewController = {
  createReviewController,
  getAllReviewsController,
  getSingleReviewController,
};
