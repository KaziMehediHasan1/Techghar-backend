import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { reviewController } from "@/app/modules/review/review.controller.js";
import { reviewZodSchema } from "@/app/modules/review/review.validation.js";
import express from "express";


const route = express.Router();
// --- Both Can Access
route.post("/",validateRequest(reviewZodSchema), validateAccessToken("user","admin"), reviewController.createReview);
route.get("/:id",validateAccessToken("user","admin"), reviewController.getSingleReview);
route.patch("/:id",validateAccessToken("user","admin"), reviewController.updateReview);
route.delete("/:id",validateAccessToken("user","admin"), reviewController.deleteReview);

// --- Admin Access ---
route.get("/", validateAccessToken("admin"), reviewController.getAllReviews);
const reviewRoute = route;
export default reviewRoute;
