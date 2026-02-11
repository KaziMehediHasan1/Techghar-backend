import { reviewService } from "@/app/modules/review/review.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewService.createReviewIntoDB(req.body);
  // console.log(result, "check data is come?");
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.created.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.created.message,
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const {} = req.query
  const result = await reviewService.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.fetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.fetched.message,
    data: result,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await reviewService.getSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.fetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.fetched.message,
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await reviewService.updateReviewInDB({ data, id });

  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.updated.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.updated.message,
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await reviewService.deleteReviewFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.review.deleted.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.review.deleted.message,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
