import profileModel from "@/app/modules/profile/profile.model.js";
import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/app/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";

const createProfileAddressIntoDB = async (payload: any) => {
  const { userID } = payload;
  const checkUserIsAvilable = await userModel.findById({ _id: userID });
  if (!checkUserIsAvilable) {
    throw new AppError(
      ERROR_MESSAGES.profile.notFound.statusCode,
      ERROR_MESSAGES.profile.notFound.message
    );
  }
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
  const result = await profileModel.findById({ _id: payload });
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
  const userDelete = await userModel.findByIdAndDelete({
    _id: payload?.userID,
  });
  const result = await profileModel.findByIdAndDelete({ _id: payload?.id });
  if (!result && !userDelete) {
    throw new AppError(
      ERROR_MESSAGES.profile.deleteFailed.statusCode,
      ERROR_MESSAGES.profile.deleteFailed.message
    );
  }
  return result;
};

const updateProfileAddressIntoDB = async (payload: any) => {
  
};

export const profileService = {
  createProfileAddressIntoDB,
  getAllProfileAddressIntoDB,
  getProfileAddressIntoDB,
  deleteProfileAddressIntoDB,
  updateProfileAddressIntoDB,
};
