import express from "express";
import { reviewController } from "./review.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { reviewZodSchema } from "./review.validation.js";

const route = express.Router();
route.post("/create-review", validateRequest(reviewZodSchema),reviewController.reviewPostController);

const reviewRoute = route;
export default reviewRoute;
