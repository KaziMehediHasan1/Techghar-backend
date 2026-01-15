import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { promoController } from "@/app/modules/promotion/promotion.controller.js";
import { promotionValidation } from "@/app/modules/promotion/promotion.validation.js";
import express from "express";


const route = express.Router();

// --- For Admin Access ---
route.post("/", validateRequest(promotionValidation),validateAccessToken("admin"), promoController.createPromotion);
route.get("/:id", validateAccessToken("admin"), promoController.getSinglePromotion);
route.delete("/:id", validateAccessToken("admin"), promoController.deleteSinglePromotion);
route.patch("/:id", validateAccessToken("admin"), promoController.updatePromotion);

const promotionRoute = route
export default promotionRoute