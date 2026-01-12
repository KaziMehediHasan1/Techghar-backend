import express from "express";
import { reviewController } from "./review.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { reviewZodSchema } from "./review.validation.js";
import { validateAccessToken } from "../../middlewares/auth.js";

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
