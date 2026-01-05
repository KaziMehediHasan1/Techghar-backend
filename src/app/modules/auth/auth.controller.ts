import config from "@/src/config/index.js";
import { generateRefreshToken } from "../../middlewares/auth.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";

const loginUser = catchAsync(async (req, res) => {
  const { email, password, _id, uid, role } = req.body;
  const jwtPayload = {
    _id,
    uid,
    email,
    role,
  };
  const refreshToken = generateRefreshToken(jwtPayload);
  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "development",
    httpOnly: false, // false just development er jonno. "pore thik korbo"
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  if (!email && !password) {
    throw new Error("Email and Password are wrong!");
  }
  const result = { data: { email, password }, refreshToken };
  sendResponse(res, {
    statusCode: ERROR_MESSAGES.auth.invalid.statusCode,
    success: true,
    message: ERROR_MESSAGES.auth.invalid.message,
    data: result,
  });
});
