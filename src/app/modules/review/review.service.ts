import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import AppError from "../../utils/appError.js";
import reviewModel from "./review.model.js";
import { uidGenerator } from "@/src/helper/uidGenerator.js";

const createReviewIntoDB = async (payload: any) => {
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

const getAllReviewsFromDB = async () => {
  const result = await reviewModel.find();
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message
    );
  }
  return result;
};

const getSingleReviewFromDB = async (payload: any) => {
  // CHECK ID -
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      "Id is not correct, try again.."
    );
  }

  const result = await reviewModel.findById({ _id: payload });

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message
    );
  }

  return result;
};

export const reviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
};
