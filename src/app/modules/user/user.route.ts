import express from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createUserZodSchema } from "./user.validation.js";
import { userController } from "./user.controller.js";
import { validateAccessToken } from "../../middlewares/auth.js";

const route = express.Router();
route.post(
  "/auth/register",
  validateRequest(createUserZodSchema),
  userController.createUsers
);
route.get("/users", validateAccessToken("admin"), userController.getUsers);

const userRoute = route;
export default userRoute;
