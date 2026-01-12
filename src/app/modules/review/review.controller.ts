import { SUCCESS_MESSAGES } from "@/src/constants/successMessages.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { reviewService } from "./review.service.js";

const createReviewController = catchAsync(async (req, res) => {
  const result = await reviewService.createReviewIntoDB(req.body);
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
  const result = await reviewService.getSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.fetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.fetched.message,
    data: result,
  });
});

const updateReviewController = catchAsync(async (req, res) => {
  const { description } = req.body;
  const id = req.params.id;

  const result = await reviewService.updateReviewInDB({ description, id });

  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.updated.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.updated.message,
    data: result,
  });
});

const deleteReviewController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await reviewService.deleteReviewFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.deleted.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.deleted.message,
    data: result,
  });
});

export const reviewController = {
  createReviewController,
  getAllReviewsController,
  getSingleReviewController,
  updateReviewController,
  deleteReviewController,
};
