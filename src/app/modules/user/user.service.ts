import config from "@/src/config/index.js";
import bcrypt from "bcrypt";
import userModel from "./user.model.js";
import AppError from "../../utils/appError.js";
import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";
import { uidGenerator } from "@/src/helper/uidGenerator.js";

// CREATE A NEW USER
const createUser = async (payload: any) => {
  
  // CHECK USER IS ALREADY REGISTERD -
  if (payload.email && payload.password) {
    const user = await userModel.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (user)
      throw new AppError(
        ERROR_MESSAGES.auth.exists.statusCode,
        ERROR_MESSAGES.auth.exists.message
      );
  }

  // GENERATE UID - 
  const uid = uidGenerator()
  payload.uid = uid;
  const salt = Number(config.bcrypt_salt_rounds);

  // HASH PASSWORD -
  const hashedPass = await bcrypt.hash(payload.password, salt || 12);
  payload.password = hashedPass;

  // SAVE USER IN DB -
  const user = new userModel(payload);
  const result = await user.save();

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.auth.registrationFailed.statusCode,
      ERROR_MESSAGES.auth.registrationFailed.message
    );
  }

  return result;
};

// GET ALL USERS FOR ADMIN
const getUsers = async () => {
  const result = await userModel.find();
  return result;
};


// GET SINGLE USER FOR USING ID || UUID - GET ADMIN AND USER BOTH
const profile = async (id: string) => {
  const result = await userModel.findById({_id: id}).select("-password");
  return result;
};

export const userService = {
  createUser,
  getUsers,
  profile,
};
