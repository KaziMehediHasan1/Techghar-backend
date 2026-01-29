import catchAsync from "@/utils/catchAsync.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/middlewares/auth.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import config from "@/config/index.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import sendResponse from "@/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";
import { authService } from "@/app/modules/auth/auth.service.js";
import { setRefreshTokenCookie } from "@/helper/setRefreshTokenCookie.js";
import AppError from "@/utils/appError.js";

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginService({ email, password });

  const jwtPayload = {
    id: result?._id.toString(),
    uid: result?.uid,
    email: result?.email,
    role: result?.role,
  };

  // CREAE TOKEN
  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  // SET REFRESH-TOKEN IN COOKIES
  setRefreshTokenCookie(res, refreshToken);

  const userData = result?.toObject() as any;
  delete userData.password;

  if (!result?.email && !result?.password) {
    throw new Error(ERROR_MESSAGES.auth.notFound.message);
  }

  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.auth.loggedIn.statusCode,
    success: true,
    message: SUCCESS_MESSAGES.auth.loggedIn.message,
    data: { result, accessToken },
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await authService.forgetPasswordIntoDB(email);
  sendResponse(res, {
    statusCode: 200,
    message:
      "Password reset link has been sent to your email. Please check your inbox.",
    success: true,
  });
});

const resetPasswordIntoDB = catchAsync(async (req, res) => {
  const { password, token } = req.body;
  // console.log(password, token, "check");
  const result = await authService.resetPasswordIntoDB({ password, token });
  sendResponse(res, {
    statusCode: 201,
    message: "Reset successfull",
    data: result,
    success: true,
  });
});

// REFRESH-TOKEN GENERATOR -
const refreshAccessToken = catchAsync(async (req, res) => {
  const refreshTokenFromCookie = req.cookies.refreshToken;
  console.log(refreshTokenFromCookie, "refreshAccessToken");
  if (!refreshTokenFromCookie) {
    throw new AppError(401, "Please login again");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshTokenFromCookie,
      config.jwt.refresh_secret as string,
    ) as any;
  } catch (err) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const jwtPayload = {
    id: decoded.id,
    uid: decoded.uid,
    email: decoded.email,
    role: decoded.role,
  };

  const newAccessToken = generateAccessToken(jwtPayload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed",
    data: {
      accessToken: newAccessToken,
    },
  });
});

export const authController = {
  loginUser,
  forgetPassword,
  resetPasswordIntoDB,
  refreshAccessToken,
};
