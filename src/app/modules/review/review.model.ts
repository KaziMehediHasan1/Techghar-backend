import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { IReview } from "./review.interface.js";

const reviewSchema = new mongoose.Schema<IReview>({
  uid: {
    type: String,
    required: true,
    unique: true,
    default: () => "UID-" + uuidv4(),
  },
  reviewer: { type: String},
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("review", reviewSchema);
