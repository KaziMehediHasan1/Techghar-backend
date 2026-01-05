import { generateRefreshToken } from "../../middlewares/auth.js";
import userModel from "../user/user.model.js";

const loginService = async (payload: any) => {
  const result = await userModel.findOne(payload);
  console.log(result, "auth service");
  
  return result;
};

export const authService = {
  loginService,
};
