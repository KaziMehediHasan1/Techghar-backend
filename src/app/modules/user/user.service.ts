import config from "@/src/config/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import userModel from "./user.model.js";

// CREATE A NEW USER
const createUser = async (payload: any) => {
  const uid = "UID-" + uuidv4();
  payload.uid = uid;
  const salt = Number(config.bcrypt_salt_rounds);
  // Hash password
  const hashedPass = await bcrypt.hash(payload.password, salt || 12);
  payload.password = hashedPass;
  const user = new userModel(payload);
  const result = await user.save();
  if (!result) {
    throw new Error("User creation failed");
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
