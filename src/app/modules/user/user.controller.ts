import { generateAccessToken } from "../../middlewares/auth.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { userService } from "./user.service.js";

// CREATE NEW USER -
const createUsers = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  const jwtPayload = {
    _id: result._id,
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

// GET ALL USERS - ADMIN
const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users get successfully",
    data: result,
  });
});

// GET USER PROFILE FOR ADMIN AND USER BOTH ONE -
const profile = catchAsync(async (req, res) => {
  // console.log(req.params.id,"controller id")
  const result = await userService.profile((req.params.id) as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const userController = {
  // Controller methods will be defined here
  createUsers,
  getUsers,
  profile,
};
