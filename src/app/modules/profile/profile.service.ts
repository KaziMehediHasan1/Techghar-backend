import profileModel from "@/app/modules/profile/profile.model.js";
import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/app/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";

const createProfileAddressIntoDB = async (payload: any) => {
  const { id } = payload;
  const checkUserIsAvilable = await userModel.findById({ _id: id });
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

const getProfileAddressIntoDB = async (payload: string) => {};

const getAllProfileAddressIntoDB = async (payload: any) => {};

const deleteProfileAddressIntoDB = async (payload: string) => {};

const updateProfileAddressIntoDB = async (payload: any) => {};

export const profileService = {
  createProfileAddressIntoDB,
  getAllProfileAddressIntoDB,
  getProfileAddressIntoDB,
  deleteProfileAddressIntoDB,
  updateProfileAddressIntoDB,
};
