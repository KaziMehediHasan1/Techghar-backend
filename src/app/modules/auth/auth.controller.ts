import catchAsync from "@/app/utils/catchAsync.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/middlewares/auth.js";
import config from "@/config/index.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import sendResponse from "@/app/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";
import { authService } from "@/app/modules/auth/auth.service.js";

// LOGIN USER -
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body,"bodyyy")
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
  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

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

// REFRESH-TOKEN GENERATOR -
// const refreshToken = catchAsync(async(req,res)=>{
//   const result = setRefreshTokenCookie()
// })
export const authController = {
  loginUser,
};
