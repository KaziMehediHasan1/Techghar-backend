import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { cartController } from "@/app/modules/cart/cart.controller.js";
import { zodAddToCardDataValidation } from "@/app/modules/cart/cart.validation.js";
import express from "express";

const route = express.Router();

route.post("/", validateAccessToken("user","admin"), validateRequest(zodAddToCardDataValidation), cartController.createCartData)
route.get("/:id", validateAccessToken("user","admin"), cartController.getCartData)
route.get("/", validateAccessToken("admin"), cartController.getCartDatas)
route.delete("/:id", validateAccessToken("user","admin"), cartController.deleteCartData)

const addToCartRoute = route;
export default addToCartRoute;
