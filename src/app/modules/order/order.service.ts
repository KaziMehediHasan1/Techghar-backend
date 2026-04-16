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
  const result = await orderModel.find({ userId: payload as any });
  if (!result) {
    throw new AppError(404, "Fetched Fail, Try again 20sec later.");
  }
  return result;
};

const getAllOrderIntoDB = async (payload: any) => {
  const { search, page, limit } = payload;
  const skip = (Number(page) - 1) * Number(limit);

  let query = {};
  if (search) {
    query = {
      $or: [
        { "productData.title": { $regex: search, $options: "i" } },
        { "customerData.email": { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    };
  }

  const result = await orderModel.aggregate([
    // Product Lookup
    {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "productData",
      },
    },
    { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },

    // User/Customer Lookup
    {
      $lookup: {
        from: "users",
        let: { orderUserId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$_id", { $toObjectId: "$$orderUserId" }] },
                  { $eq: ["$uid", "$$orderUserId"] },
                ],
              },
            },
          },
        ],
        as: "customerData",
      },
    },
    { $unwind: { path: "$customerData", preserveNullAndEmptyArrays: true } },

    // Payment Lookup (
    {
      $lookup: {
        from: "payments",
        localField: "_id",
        foreignField: "orderId",
        as: "paymentData",
      },
    },
    { $unwind: { path: "$paymentData", preserveNullAndEmptyArrays: true } },

    // Search Filter
    { $match: query },

    // Pagination
    { $skip: skip },
    { $limit: Number(limit) },

    // Project
    {
      $project: {
        _id: 1,
        quantity: 1,
        status: 1,
        cancelledAt: 1,
        productName: "$productData.title",
        productImages: "$productData.images",
        productPrice: "$productData.price",
        customerEmail: "$customerData.email",
        transactionId: "$paymentData.transactionId",
        amount: "$paymentData.amount",
        isPaid: "$paymentData.isPaid",
        paymentMethod: "$paymentData.paymentMethod",
      },
    },
  ]);

  // Total count
  const totalDataCount = await orderModel.countDocuments();
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
  getUserOrderIntoDB
};
