import express from "express";
import { createUserZodSchema } from "./user.validation.js";
import { userController } from "./user.controller.js";
import { authController } from "../auth/auth.controller.js";
import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";

const route = express.Router();

// --- Auth Related ---
route.post("/auth/register",validateRequest(createUserZodSchema),userController.registerUser);
route.post("/auth/login", authController.loginUser);

// --- Admin Only ---
route.get("/users", validateAccessToken("admin"), userController.getAllUsers);
route.delete("/admin/user/:id", validateAccessToken("admin"), userController.deleteUserByAdmin);

// --- Both Access ---
route.get("/profile/:id",validateAccessToken("user", "admin"),userController.getMyProfile);
route.delete("/me/:id",validateAccessToken("user", "admin"),userController.deleteMyAccount);
route.patch("/update/profile/:id",validateAccessToken("user", "admin"),userController.upadetProfile);

const userRoute = route;
export default userRoute;
