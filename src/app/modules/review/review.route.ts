import express from "express";
import { reviewController } from "./review.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { reviewZodSchema } from "./review.validation.js";
import { validateAccessToken } from "../../middlewares/auth.js";

const route = express.Router();
route.post("/create-review",validateRequest(reviewZodSchema),reviewController.createReviewController);
// validateAccessToken
route.get("/get-all-review", reviewController.getAllReviewsController);
route.get("/get-single-review/:id", reviewController.getSingleReviewController);
route.patch("/update-review/:id", reviewController.updateReviewController);
route.delete("/delete-review/:id", reviewController.deleteReviewController);

const reviewRoute = route;
export default reviewRoute;
