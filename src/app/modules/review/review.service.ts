import reviewModel from "@/app/modules/review/review.model.js";
import AppError from "@/app/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import { uidGenerator } from "@/helper/uidGenerator.js";


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

const updateReviewInDB = async (payload: any) => {
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message
    );
  }

  const result = await reviewModel.findByIdAndUpdate(
    { _id: payload.id },
    { description: payload.description },
    { new: true }
  );

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.updateFailed.statusCode,
      ERROR_MESSAGES.review.updateFailed.message
    );
  }

  return result;
};

const deleteReviewFromDB = async (payload: any) => {
  const result = await reviewModel.findByIdAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.deleteNotFound.statusCode,
      ERROR_MESSAGES.review.deleteNotFound.message
    );
  }
  return result;
};

export const reviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewInDB,
  deleteReviewFromDB,
};
