import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import AppError from "../../utils/appError.js";
import reviewModel from "./review.model.js";
import { uidGenerator } from "@/src/helper/uidGenerator.js";

const reviewPostService = async (payload: any) => {
  // CHECK ALL REVIEWS DATA IS VALID OR NOT.
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.invalidData.statusCode,
      ERROR_MESSAGES.review.invalidData.message
    );
  }
  // UID GENERATOR FUNCTION -
  const uid = uidGenerator();
  payload.uid = uid;
  const result = await reviewModel.create(payload);
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
