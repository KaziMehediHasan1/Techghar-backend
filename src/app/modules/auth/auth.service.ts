import type { IUserSchema } from "@/app/modules/user/user.interface.js";
import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import type { HydratedDocument } from "mongoose";
import { sendEmail } from "@/services/sendEmail.js";

const loginService = async (payload: any) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .select("+password");

  // CHECKING FOR USER HAS AVALAVLE IN DB -
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.auth.notFound.statusCode,
      ERROR_MESSAGES.auth.notFound.message,
    );
  }

  // PASS CHECK -
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user.password,
  );

  // PASS IS NOT MATCH, THEN..
  if (!isPasswordMatch)
    throw new AppError(
      ERROR_MESSAGES.auth.invalid.statusCode,
      ERROR_MESSAGES.auth.invalid.message,
    );

  return user;
};

const forgetPasswordIntoDB = async (payload: any) => {
  const user = await userModel.findOne({ email: payload });
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.auth.notFound.statusCode,
      ERROR_MESSAGES.auth.notFound.message,
    );
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = new Date(Date.now() + 50 * 60 * 1000);
  await user.save();

  const resetUrl = `http://localhost:5000/reset-password?token=${resetToken}`;

  // send Email
  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `
    <p>You requested a password reset.</p>
    <p>Click below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link expires in 10 minutes.</p>
  `,
  });
};

const resetPasswordIntoDB = async (payload: any) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(payload.token)
    .digest("hex");

  const user = (await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  })) as HydratedDocument<Partial<IUserSchema>>;

  console.log(user,"check user ace kina")
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.auth.unauthorized.statusCode,
      ERROR_MESSAGES.auth.unauthorized.message,
    );
  }

  user.password = await bcrypt.hash(payload.password, 12);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  const result = await user.save();
  return result;
};

export const authService = {
  loginService,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
};
