import orderModel from "@/app/modules/order/order.model.js";
import AppError from "@/app/utils/appError.js";
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

const getAllOrderIntoDB = async () => {
  const result = await orderModel.find();
  if (!result) {
    throw new AppError(404, "Fetched Fail, Try again 20sec later.");
  }
  return result;
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
