import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import userModel from "../user/user.model.js";
// import { createToken, verifyToken } from "../../utils/authUtils.js";
// import config from "../../config/index.js";
// import AppError from "../../utils/AppError.js";
// import { ERROR_MESSAGES } from "../../constants/errorMessages.js";
import bcrypt from "bcrypt";

const loginService = async (payload: any) => {
  console.log(payload,"auth service")
  const user = await userModel
    .findOne({ email: payload?.email })
    .select("+password");

  if (!user) {
    throw new Error(ERROR_MESSAGES.auth.notFound.message);
  }

  // PASS CHECK -
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user.password
  );

  if (!isPasswordMatch) throw new Error(ERROR_MESSAGES.auth.invalid.message);

  return user;
};

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   // ১. চেক করা টোকেন আছে কি না
//   if (!refreshToken) {
//     throw new AppError(
//       ERROR_MESSAGES.auth.unauthorized.statusCode,
//       ERROR_MESSAGES.auth.unauthorized.message
//     );
//   }

//   // ২. রিফ্রেশ টোকেন ভেরিফাই করা
//   let decoded;
//   try {
//     decoded = verifyToken(refreshToken, config.jwt_refresh_secret as string);
//   } catch (err) {
//     throw new AppError(
//       401,
//       "Invalid or Expired Refresh Token! Please login again."
//     );
//   }

//   // ৩. নতুন Access Token তৈরি (Refresh Token এর ডাটা দিয়ে)
//   const jwtPayload = {
//     _id: decoded._id,
//     uid: decoded.uid,
//     email: decoded.email,
//     role: decoded.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string
//   );

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Access token refreshed successfully!",
//     data: {
//       accessToken,
//     },
//   });
// });
// export const authService = {
//   loginService,
// };

export const authService = {
  loginService,
};
