import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { zodContactValidation } from "@/app/modules/category/category.validation.js";
import { contactController } from "@/app/modules/contact/contact.controller.js";
import express from "express";

const route = express.Router();

route.post("/", validateAccessToken("admin"),validateRequest(zodContactValidation),contactController.createContactData);
route.get("/:id", validateAccessToken("user", "admin"));
route.get("/", validateAccessToken("admin"));
route.delete("/:id", validateAccessToken("admin"));

const contactRoute = route;
export default contactRoute;
