import config from "@/src/config/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import userModel from "./user.model.js";

const createUser = async (payload: any) => {
  const uid = "UID-" + uuidv4();
  payload.uid = uid;
  const salt = Number(config.bcrypt_salt_rounds);
  // Hash password
  const hashedPass = await bcrypt.hash(payload.password, salt) || 12;
  payload.password = hashedPass;

  const result = await userModel.create(payload);
  return result;
};

const getUsers = async ()=>{
  const result = await userModel.find()
  return result
}

export const userService = {
  createUser,
  getUsers,
};
