import { validateAccessToken } from "@/app/middlewares/auth.js";
import express from "express";

const route = express.Router();

route.post("/", validateAccessToken("user"));
route.get("/:id", validateAccessToken("user", "admin"));
route.get("/", validateAccessToken("admin"));
route.delete("/:id", validateAccessToken("admin"));

const contactRoute = route;
export default contactRoute;
