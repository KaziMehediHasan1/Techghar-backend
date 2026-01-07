import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import userModel from "../user/user.model.js";
import bcrypt from "bcrypt";
import AppError from "../../utils/appError.js";

const loginService = async (payload: any) => {
  console.log(payload, "auth service");
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
