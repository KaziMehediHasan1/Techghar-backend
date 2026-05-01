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

const getUserOrderIntoDB = async (payload: string) => {
  const result = await orderModel
    .find({ userId: payload as any })
    .populate("productID");
  if (!result) {
    throw new AppError(404, "Fetched Fail, Try again 20sec later.");
  }
  return result;
};

const getAllOrderIntoDB = async (payload: any) => {
  const page = Math.max(1, Number(payload.page) || 1);
  const limit = Math.max(1, Number(payload.limit) || 10);

  const skip = (page - 1) * limit;

  const { search } = payload;
  let query = {};
  if (search) {
    query = {
      $or: [
        { "productData.title": { $regex: search, $options: "i" } },
        { "customerData.email": { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    };
  }

  const result = await orderModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "customerData",
      },
    },
    { $unwind: { path: "$customerData", preserveNullAndEmptyArrays: true } },

    // Search Filter
    { $match: query },

    { $sort: { createdAt: -1 } },

    // Pagination
    { $skip: skip },
    { $limit: limit },

    // Project
    {
      $project: {
        _id: 1,
        quantity: 1,
        status: 1,
        cancelledAt: 1,
        createdAt: 1,
        productName: "$productData.title",
        productImages: "$productData.images",
        productPrice: "$productData.price",
        customerEmail: "$customerData.email",
        customerName: "$customerData.name",
        transactionId: "$paymentData.transactionId",
        amount: "$paymentData.amount",
        isPaid: "$paymentData.isPaid",
        paymentMethod: "$paymentData.paymentMethod",
      },
    },
  ]);

  const totalDataCount = await orderModel.countDocuments(query);

  return {
    result,
    meta: {
      page,
      limit,
      total: totalDataCount,
      totalPage: Math.ceil(totalDataCount / limit),
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
  getUserOrderIntoDB,
};
