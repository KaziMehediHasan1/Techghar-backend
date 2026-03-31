import orderModel from "@/app/modules/order/order.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";

const createOrderIntoDB = async (payload: any) => {
  const result = await orderModel.create(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.order.notFound.statusCode,
      ERROR_MESSAGES.order.notFound.message,
    );
  }
  return result;
};

const getOrderIntoDB = async (payload: string) => {
  const result = await orderModel.findById({ _id: payload });
  if (!result) {
    throw new AppError(404, "Fetched Fail, Try again 20sec later.");
  }
  return result;
};

const getAllOrderIntoDB = async (payload: any) => {
  const { search, page, limit } = payload;
  let query = {};
  if (search) {
    query = {
      $or: [
        { productName: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
      ],
    };
  }
  const totalDataCount = await orderModel.countDocuments(query);
  const result = await orderModel
    .find(query)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));
  if (!result) {
    throw new AppError(404, "Fetched Fail, Try again 20sec later.");
  }

  return {
    result,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: totalDataCount,
      totalPage: Math.ceil(totalDataCount / Number(limit)),
    },
  };
};

const updateOrderIntoDB = async (payload: any) => {
  const result = await orderModel.findOneAndUpdate(
    { _id: payload.id },
    { $set: payload.data },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, "Not updated this order info.");
  }
  return result;
};

const deleteOrderIntoDB = async (payload: string) => {
  const result = await orderModel.findOneAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(404, "This order not deleted.");
  }
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getOrderIntoDB,
  getAllOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
};
