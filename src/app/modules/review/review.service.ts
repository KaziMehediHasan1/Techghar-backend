import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import AppError from "../../utils/appError.js";
import reviewModel from "./review.model.js";

const reviewPostService = async (payload: any) => {
  // CHECK ALL REVIEWS DATA IS VALID OR NOT.
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.invalidData.statusCode,
      ERROR_MESSAGES.review.invalidData.message
    );
  }
  const review = new reviewModel(payload);
  const result = await review.save();
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.creationFailed.statusCode,
      ERROR_MESSAGES.review.creationFailed.message
    );
  }
  return result;
};

export const reviewService = {
  reviewPostService,
};
