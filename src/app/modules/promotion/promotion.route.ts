import express from "express";
import { validateAccessToken } from "../../middlewares/auth.js";
import { promoController } from "./promotion.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { promotionValidation } from "./promotion.validation.js";

const route = express.Router();

// --- For Admin Access ---
route.post("/", validateRequest(promotionValidation),validateAccessToken("admin"), promoController.createPromotion);
route.get("/:id", validateAccessToken("admin"), promoController.getSinglePromotion);
route.delete("/:id", validateAccessToken("admin"), promoController.deleteSinglePromotion);
route.patch("/:id", validateAccessToken("admin"), promoController.updatePromotion);

const promotionRoute = route
export default promotionRoute