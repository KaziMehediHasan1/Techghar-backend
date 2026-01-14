import { SUCCESS_MESSAGES } from "@/src/constants/successMessages.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { promoService } from "./promotion.service.js";

const createPromotion = catchAsync(async (req, res) => {
  const result = await promoService.createPromotionIntoDB(req.body);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.promotion.created.statusCode,
    message: SUCCESS_MESSAGES.promotion.created.message,
    success: true,
    data: result,
  });
});

const getSinglePromotion = catchAsync(async (req, res) => {
  const result = await promoService.getSinglePromotionIntoDB(
    req.params.id as string
  );
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.promotion.fetchedSingle.statusCode,
    message: SUCCESS_MESSAGES.promotion.fetchedSingle.message,
    success: true,
    data: result,
  });
});

const deleteSinglePromotion = catchAsync(async (req, res) => {
  const result = await promoService.deletePromotionIntoDB(
    req.params.id as string
  );
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.promotion.deleted.statusCode,
    message: SUCCESS_MESSAGES.promotion.deleted.message,
    success: true,
    data: result,
  });
});

const updatePromotion = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await promoService.updatePromotionIntoDB({ data, id });
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.promotion.updated.statusCode,
    message: SUCCESS_MESSAGES.promotion.updated.message,
    success: true,
    data: result,
  });
});

export const promoController = {
  createPromotion,
  getSinglePromotion,
  deleteSinglePromotion,
  updatePromotion,
};
