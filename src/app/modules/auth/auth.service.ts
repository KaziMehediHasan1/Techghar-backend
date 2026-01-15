import userModel from "@/app/modules/user/user.model.js";
import AppError from "@/app/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
import bcrypt from "bcrypt";

const loginService = async (payload: any) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .select("+password");

  // CHECKING FOR USER HAS AVALAVLE IN DB -
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.auth.notFound.statusCode,
      ERROR_MESSAGES.auth.notFound.message
    );
  }

  // PASS CHECK -
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user.password
  );

  // PASS IS NOT MATCH, THEN..
  if (!isPasswordMatch)
    throw new AppError(
      ERROR_MESSAGES.auth.invalid.statusCode,
      ERROR_MESSAGES.auth.invalid.message
    );

  return user;
};

export const authService = {
  loginService,
};
