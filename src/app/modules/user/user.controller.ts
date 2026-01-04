import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { userService } from "./user.service.js";

// CREATE NEW USER -
const createUsers = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// GET ALL USERS - ADMIN
const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

export const userController = {
  // Controller methods will be defined here
  createUsers,
  getUsers
};
