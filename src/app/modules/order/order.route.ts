import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { orderController } from "@/app/modules/order/order.controller.js";
import { zodOrderValidation } from "@/app/modules/order/order.validation.js";
import express from "express";

const route = express.Router();

route.post("/",validateRequest(zodOrderValidation) ,validateAccessToken("admin","user"), orderController.createOrder);
route.get("/:id", validateAccessToken("admin","user"), orderController.getOrder);
route.get("/", validateAccessToken("admin"),orderController.getAllOrder);
route.patch("/:id", validateAccessToken("admin"), orderController.updateOrder);
route.delete("/:id", validateAccessToken("user","admin"), orderController.deleteOrder);

const orderRoute = route;
export default orderRoute;
