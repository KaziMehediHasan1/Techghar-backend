import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import promotionModel from "./promotion.model.js";
import AppError from "../../utils/appError.js";

const createPromotionIntoDB = async (payload: any) => {
  // Check promotion already have ?
  const result = new promotionModel(payload);
  const promo = await result.save();
  if (!promo) {
    if (!promo)
      throw new AppError(
        ERROR_MESSAGES.promotion.creationFailed.statusCode,
        ERROR_MESSAGES.promotion.creationFailed.message
      );
  }
  return promo;
};

const getSinglePromotionIntoDB = async (payload: string) => {
  const result = await promotionModel.findById({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.promotion.notFound.statusCode,
      ERROR_MESSAGES.promotion.notFound.message
    );
  }
  return result;
};

const deletePromotionIntoDB = async (payload: string) => {
  const result = await promotionModel.findByIdAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.promotion.deleteFailed.statusCode,
      ERROR_MESSAGES.promotion.deleteFailed.message
    );
  }
  return result;
};

const updatePromotionIntoDB = async (payload: any) => {
  console.log(payload, "promo update");
  if (
    !payload?.data ||
    payload?.data === undefined ||
    (Object.keys(payload?.data).length === 0 && !payload?.id)
  )
    throw new AppError(
      ERROR_MESSAGES.promotion.updateFailed.statusCode,
      ERROR_MESSAGES.promotion.updateFailed.message
    );

  const result = await promotionModel.findByIdAndUpdate(
    { _id: payload?.id },
    { $set: payload?.data }
  );
  return result;
};

export const promoService = {
  createPromotionIntoDB,
  getSinglePromotionIntoDB,
  deletePromotionIntoDB,
  updatePromotionIntoDB,
};
