import { profileService } from "@/app/modules/profile/profile.service.js";
import catchAsync from "@/app/utils/catchAsync.js";
import sendResponse from "@/app/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";

const createProfileAddress = catchAsync(async (req, res) => {
  const result = await profileService.createProfileAddressIntoDB(req.body);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.profile.created.statusCode,
    message: SUCCESS_MESSAGES.profile.created.message,
    data: result,
    success: true,
  });
});

const getProfileAddress = catchAsync(async (req, res) => {});

const getAllProfileAddress = catchAsync(async (req, res) => {});

const deleteProfileAddress = catchAsync(async (req, res) => {});

const updateProfileAddress = catchAsync(async (req, res) => {});

export const profileController = {
  createProfileAddress,
  getProfileAddress,
  getAllProfileAddress,
  deleteProfileAddress,
  updateProfileAddress,
};
