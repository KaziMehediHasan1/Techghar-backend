import type { IReview } from "@/app/modules/review/review.interface.js";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    userId: { type: String, ref: "user", required: true },
    productId: { type: String, ref: "product", required: true },

    rating: { type: Number, min: 1, max: 5, required: true, index: true },
    comment: { type: String, required: true },

    isVerifiedPurchase: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false, index: true },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReview>("review", reviewSchema);
