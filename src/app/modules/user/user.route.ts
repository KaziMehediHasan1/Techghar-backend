import express from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createUserZodSchema } from "./user.validation.js";
import { userController } from "./user.controller.js";



const route = express.Router();
route.post("/register", validateRequest(createUserZodSchema),userController.createUsers)

const userRoute = route;
export default userRoute; 