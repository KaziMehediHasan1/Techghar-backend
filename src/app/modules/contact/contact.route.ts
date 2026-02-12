import { validateAccessToken } from "@/app/middlewares/auth.js";
import { contactController } from "@/app/modules/contact/contact.controller.js";
import express from "express";

const route = express.Router();

route.post("/", validateAccessToken("admin"),contactController.createContactData);
route.get("/:id", validateAccessToken("user", "admin"),contactController.getContactData);
route.get("/", validateAccessToken("admin"), contactController.getContactsData);
route.delete("/:id", validateAccessToken("admin"), contactController.deleteContactData);

const contactRoute = route;
export default contactRoute;
