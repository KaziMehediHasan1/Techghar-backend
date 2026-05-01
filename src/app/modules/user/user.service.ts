import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/utils/appError.js";
import config from "@/config/index.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import { uidGenerator } from "@/helper/uidGenerator.js";
import bcrypt from "bcrypt";
import mongoose, { Types } from "mongoose";
import profileModel from "../profile/profile.model.js";

const createUserIntoDB = async (payload: any) => {
  // CHECK USER IS ALREADY REGISTERD -
  if (payload.email && payload.password) {
    const user = await userModel.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (user)
      throw new AppError(
        ERROR_MESSAGES.auth.exists.statusCode,
        ERROR_MESSAGES.auth.exists.message,
      );
  }

  // GENERATE UID -
  const uid = uidGenerator();
  payload.uid = uid;
  const salt = Number(config.bcrypt_salt_rounds);

  // HASH PASSWORD -
  const hashedPass = await bcrypt.hash(payload.password, salt || 12);
  payload.password = hashedPass;

  // SAVE USER IN DB -
  const user = new userModel(payload);
  const result = await user.save();

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.auth.registrationFailed.statusCode,
      ERROR_MESSAGES.auth.registrationFailed.message,
    );
  }

  return result;
};

const getAllUsersFromDB = async (payload: any) => {
  let query: any = {};

  if (payload.search) {
    query.$or = [
      { name: { $regex: payload.search, $options: "i" } },
      { email: { $regex: payload.search, $options: "i" } },
      { role: { $regex: payload.search, $options: "i" } },
    ];
  }

  if (payload.role) {
    query.role = payload.role;
  }

  const limit = Number(payload.limit) || 10;
  const page = Number(payload.page) || 1;
  const skipPage = (page - 1) * limit;

  const result = await userModel.aggregate([
    { $match: query },

    // Cart Lookup
    {
      $lookup: {
        from: "carts",
        localField: "_id",
        foreignField: "userId",
        as: "cartData", // matching with size field
      },
    },

    //  Payment Lookup
    {
      $lookup: {
        from: "payments",
        localField: "_id",
        foreignField: "userId",
        as: "paymentData",
      },
    },

    // Order Lookup (Pending status only)
    {
      $lookup: {
        from: "orders",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$status", "pending"] },
                  { $eq: ["$userId", "$$userId"] },
                ],
              },
            },
          },
        ],
        as: "pendingOrders",
      },
    },

    // ৪. Data Formatting
    {
      $addFields: {
        id: "$_id",
        cartItemCount: { $size: "$cartData" },
        totalPurchaseCount: { $size: "$paymentData" },

        lastPurchasedItem: {
          $let: {
            vars: {
              lastPay: { $arrayElemAt: ["$paymentData", -1] },
            },
            in: {
              $ifNull: [
                { $arrayElemAt: ["$$lastPay.products.name", 0] },
                "No Purchase Yet",
              ],
            },
          },
        },
        isAccountActive: true,
      },
    },

    //  Cleanup
    {
      $project: {
        password: 0,
        paymentData: 0,
        cartData: 0,
        pendingOrders: 0,
      },
    },

    { $skip: skipPage },
    { $limit: limit },
  ]);

  console.log(result, "check result...");
  return { result, total: result.length };
};

const getUserProfileFromDB = async (payload: string) => {
  const result = await userModel.findById({ _id: payload }).select("-password");
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.auth.notFound.statusCode,
      ERROR_MESSAGES.auth.notFound.message,
    );
  }
  return result;
};

const getUserByAdminFromDB = async () => {
  const result = await userModel.find();
  return result;
};

const deleteUserFromDB = async (payload: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = new Types.ObjectId(payload);

    const deletedUser = await userModel
      .findByIdAndDelete({ _id: userId })
      .session(session);

    if (!deletedUser) {
      throw new AppError(
        ERROR_MESSAGES.auth.deleteNotFound.statusCode,
        ERROR_MESSAGES.auth.deleteNotFound.message,
      );
    }

    await profileModel
      .findOneAndDelete({ userID: userId as any })
      .session(session);

    await session.commitTransaction();
    await session.endSession();

    return deletedUser;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    return error;
  }
};

const deleteUserByAdminFromDB = async (payload: string) => {
  const result = await userModel.findOneAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.user.adminDeleteFailed.statusCode,
      ERROR_MESSAGES.user.adminDeleteFailed.message,
    );
  }
  return result;
};

const updateProfileFromDB = async (payload: any) => {
  const { id, data } = payload;
  const result = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  );
  console.log(result, "UPDATE");
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.user.updateFailed.statusCode,
      ERROR_MESSAGES.user.updateFailed.message,
    );
  }
  return result;
};

const updatePasswordFromDB = async (payload: any) => {
  const { id, data } = payload;
  const { current, newPass, confirm } = data;

  if (newPass !== confirm) {
    throw new Error("Confirm and New Password are not same!");
  }

  const user = await userModel.findById(id).select("+password");
  if (!user) {
    throw new Error("User not found!");
  }

  const isMatch = await bcrypt.compare(current, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect!");
  }

  if (current === newPass) {
    throw new Error("New password cannot be the same as current password!");
  }

  const salt = Number(config.bcrypt_salt_rounds);

  // HASH PASSWORD -
  const hashedPass = await bcrypt.hash(newPass, salt || 12);
  user.password = hashedPass;
  const res = await user.save();
  return res;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserProfileFromDB,
  deleteUserFromDB,
  deleteUserByAdminFromDB,
  updateProfileFromDB,
  updatePasswordFromDB,
  getUserByAdminFromDB,
};
