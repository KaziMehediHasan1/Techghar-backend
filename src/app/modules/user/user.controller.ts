import config from "@/src/config/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middlewares/auth.js";
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
  const refreshToken = generateRefreshToken(jwtPayload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "development",
    httpOnly: false, // false just development er jonno. "pore thik korbo"
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
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
    message: "User get successfully",
    data: result,
  });
});

export const userController = {
  // Controller methods will be defined here
  createUsers,
  getUsers,
};
