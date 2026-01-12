import config from "@/src/config/index.js";
import bcrypt from "bcrypt";
import userModel from "./user.model.js";
import AppError from "../../utils/appError.js";
import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import { uidGenerator } from "@/src/helper/uidGenerator.js";

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
        ERROR_MESSAGES.auth.exists.message
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
      ERROR_MESSAGES.auth.registrationFailed.message
    );
  }

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await userModel.find();
  return result;
};

const getUserProfileFromDB = async (payload: string) => {
  const result = await userModel.findById({ _id: payload }).select("-password");
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.auth.notFound.statusCode,
      ERROR_MESSAGES.auth.notFound.message
    );
  }
  return result;
};

const deleteUserFromDB = async (payload: string) => {
  const result = await userModel.findByIdAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.auth.deleteNotFound.statusCode,
      ERROR_MESSAGES.auth.deleteNotFound.message
    );
  }
  return result;
};

const deleteUserByAdminFromDB = async (payload: string) => {
  const result = await userModel.findOneAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.user.adminDeleteFailed.statusCode,
      ERROR_MESSAGES.user.adminDeleteFailed.message
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
    }
  );
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.user.updateFailed.statusCode,
      ERROR_MESSAGES.user.updateFailed.message
    );
  }
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserProfileFromDB,
  deleteUserFromDB,
  deleteUserByAdminFromDB,
  updateProfileFromDB,
};
