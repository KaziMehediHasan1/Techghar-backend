import express from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createUserZodSchema } from "./user.validation.js";
import { userController } from "./user.controller.js";
import { validateAccessToken } from "../../middlewares/auth.js";
import { authController } from "../auth/auth.controller.js";

const route = express.Router();
route.post(
  "/auth/register",
  validateRequest(createUserZodSchema),
  userController.createUsers
);
route.get("/users", validateAccessToken("admin"), userController.getUsers);
route.post("/auth/login",authController.loginUserController)
const userRoute = route;
export default userRoute;
