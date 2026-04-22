import profileModel from "@/app/modules/profile/profile.model.js";
import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import mongoose from "mongoose";

const createProfileAddressIntoDB = async (payload: any) => {
  const { userID } = payload;
  const checkUserIsAvilable = await userModel.findById({ _id: userID });
  if (!checkUserIsAvilable) {
    throw new AppError(
      ERROR_MESSAGES.profile.notFound.statusCode,
      ERROR_MESSAGES.profile.notFound.message
    );
  }
  console.log("result", payload);
  const result = await profileModel.create(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.profile.createFailed.statusCode,
      ERROR_MESSAGES.profile.createFailed.message
    );
  }
  return result;
};

const getProfileAddressIntoDB = async (payload: string) => {
  const result = await profileModel.findOne({
    userID: new mongoose.Types.ObjectId(payload)
  } as any);
  if (!result) return null;
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.profile.fetchFailed.statusCode,
      ERROR_MESSAGES.profile.fetchFailed.message
    );
  }
  return result;
};

const getAllProfileAddressIntoDB = async () => {
  const result = await profileModel.find();
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.profile.fetchFailed.statusCode,
      ERROR_MESSAGES.profile.fetchFailed.message
    );
  }
  return result;
};

const deleteProfileAddressIntoDB = async (payload: any) => {
  const result = await profileModel.findByIdAndDelete(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.profile.deleteFailed.statusCode,
      ERROR_MESSAGES.profile.deleteFailed.message
    );
  }
  return result;
};

const updateProfileAddressIntoDB = async (payload: any) => {
  const { data, id } = payload;
  console.log(data, id, "peyechi");
  const result = await profileModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.profile.updateFailed.statusCode,
      ERROR_MESSAGES.profile.updateFailed.message
    );
  }
  return result;
};

export const profileService = {
  createProfileAddressIntoDB,
  getAllProfileAddressIntoDB,
  getProfileAddressIntoDB,
  deleteProfileAddressIntoDB,
  updateProfileAddressIntoDB,
};
