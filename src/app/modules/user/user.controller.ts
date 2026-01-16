import { generateAccessToken } from "@/app/middlewares/auth.js";
import { userService } from "./user.service.js";
import sendResponse from "@/app/utils/sendResponse.js";
import catchAsync from "@/app/utils/catchAsync.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userService.createUserIntoDB(payload);
  const jwtPayload = {
    _id: result._id.toString(),
    uid: result.uid,
    email: result.email,
    role: result.role,
  };
  const accessToken = generateAccessToken(jwtPayload);
  const output = { result, accessToken };

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: output,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users get successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const userId = req.user?.id as string;
  const result = await userService.getUserProfileFromDB(userId);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.user.profileFetched.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.user.profileFetched.message,
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req, res) => {
  const id = req.user?.id as string;
  const result = await userService.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.user.profileDeleted.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.user.profileDeleted.message,
    data: result,
  });
});

const deleteUserByAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userService.deleteUserByAdminFromDB(id as string);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.user.adminDeletedUser.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.user.adminDeletedUser.message,
    data: result,
  });
});

const upadetProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const data = req.body;
  const result = await userService.updateProfileFromDB({ id, data });
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.user.profileUpdated.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.user.profileUpdated.message,
    data: result,
  });
});

export const userController = {
  registerUser,
  getAllUsers,
  getMyProfile,
  deleteMyAccount,
  deleteUserByAdmin,
  upadetProfile,
};
