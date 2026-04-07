import reviewModel from "@/app/modules/review/review.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import { uidGenerator } from "@/helper/uidGenerator.js";

const createReviewIntoDB = async (payload: any) => {
  if (!payload?.productId) {
    throw new AppError(404, "Product is not has database!");
  }
  // CHECK ALL REVIEWS DATA IS VALID OR NOT.
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.invalidData.statusCode,
      ERROR_MESSAGES.review.invalidData.message,
    );
  }

  // UID GENERATOR FUNCTION -
  const uid = uidGenerator();
  payload.uid = uid;
  const result = await reviewModel.create(payload);

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.creationFailed.statusCode,
      ERROR_MESSAGES.review.creationFailed.message,
    );
  }
  return result;
};

const getAllReviewsFromDB = async (payload: any) => {
  const { rating, isApproved, page, limit } = payload;
  let query: any = {};

  if (rating) {
    query.rating = { $gte: rating };
  }
  if (isApproved) {
    query.isApproved = isApproved;
  }
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skipPage = (pageNumber - 1) * limitNumber;

  // find(query).skip(skipPage).limit(limitNumber)

  const result = await reviewModel.aggregate([
    { $match: query },
    {
      $addFields: {
        userIdObj: { $toObjectId: "$userId" },
        productIdObj: { $toObjectId: "$productId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userIdObj",
        as: "userData",
      },
    },
    { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "productIdObj",
        as: "productData",
      },
    },
    { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },

    {
      $project: {
        _id: 1,
        productId: 1,
        comment: 1,
        shortComment: 1,
        userId: 1,
        title: 1,
        review_text: 1,
        rating: 1,
        isApproved: 1,
        createdAt: 1,
        updatedAt: 1,
        product_name: "$productData.title",
        product_price: "$productData.finalPrice",
        user_name: "$userData.name",
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skipPage },
    { $limit: limitNumber },
  ]);

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message,
    );
  }
  return result;
};

const getSingleReviewFromDB = async (payload: any) => {
  // CHECK ID -
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      "Id is not correct, try again..",
    );
  }

  const result = await reviewModel.findById({ _id: payload });

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message,
    );
  }

  return result;
};

const updateReviewInDB = async (payload: any) => {
  if (!payload) {
    throw new AppError(
      ERROR_MESSAGES.review.notFound.statusCode,
      ERROR_MESSAGES.review.notFound.message,
    );
  }

  const result = await reviewModel.findByIdAndUpdate(
    { _id: payload.id },
    { $set: payload.data },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.updateFailed.statusCode,
      ERROR_MESSAGES.review.updateFailed.message,
    );
  }

  return result;
};

const deleteReviewFromDB = async (payload: any) => {
  const result = await reviewModel.findByIdAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.review.deleteNotFound.statusCode,
      ERROR_MESSAGES.review.deleteNotFound.message,
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
