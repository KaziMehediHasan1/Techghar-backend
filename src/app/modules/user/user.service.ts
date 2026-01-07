import config from "@/src/config/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import userModel from "./user.model.js";
import AppError from "../../utils/appError.js";
import { ERROR_MESSAGES } from "@/src/constants/errorMessages.js";

// CREATE A NEW USER
const createUser = async (payload: any) => {
  // CHECK USER IS ALREADY REGISTERD -
  if (payload.email && payload.password) {
    // console.log(payload.email && payload.password, "check user ace kina");
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

  const uid = "UID-" + uuidv4();
  payload.uid = uid;
  const salt = Number(config.bcrypt_salt_rounds);

  // Hash password
  const hashedPass = await bcrypt.hash(payload.password, salt || 12);
  payload.password = hashedPass;

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

// GET SINGLE USER FOR USING ID || UUID
const getUser = async (id: string) => {
  const query = id.startsWith("UID-") ? { uid: id } : { _id: id };
  const result = await userModel.findById(query);
  return result;
};

export const userService = {
  createUser,
  getUsers,
  getUser,
};
