import express from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation.js";
import { userController } from "./user.controller.js";
import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { authController } from "@/app/modules/auth/auth.controller.js";

const route = express.Router();

// --- Auth Related ---
route.post("/auth/register", validateRequest(createUserZodSchema), userController.registerUser);
route.post("/auth/login", authController.loginUser);
route.post("/auth/logout", authController.logOut);
route.post("/auth/forgot-password", authController.forgetPassword)
route.post("/auth/reset-password", authController.resetPasswordIntoDB)
route.post("/auth/refresh-token", authController.refreshAccessToken)

// --- Admin Only ---
route.get("/users", validateAccessToken("admin"), userController.getAllUsers);
route.get("/all-user", validateAccessToken("admin"), userController.getUserByAdmin);
route.delete("/admin/user/:id", validateAccessToken("admin"), userController.deleteUserByAdmin);

// --- Both Access ---
route.get("/profile/me", validateAccessToken("user", "admin"), userController.getMyProfile);
route.delete("/me/:id", validateAccessToken("user", "admin"), userController.deleteMyAccount);
route.patch("/update/profile/:id", validateRequest(updateUserZodSchema), validateAccessToken("user", "admin"), userController.upadetProfile);
route.patch("/update/password/:id", validateRequest(updateUserZodSchema), validateAccessToken("user", "admin"), userController.upadetPassword);

const userRoute = route;
export default userRoute;
