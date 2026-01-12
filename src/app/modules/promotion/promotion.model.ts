import mongoose from "mongoose";
import type { IPromotion } from "./promotion.interface.js";

const promotionSchema = new mongoose.Schema<IPromotion>({
  image: { type: String, required: true },
  alt: { type: String },
  seo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPromotion>("promotion", promotionSchema);
