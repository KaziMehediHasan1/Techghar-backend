import type { IPromotion } from "@/app/modules/promotion/promotion.interface.js";
import mongoose from "mongoose";


const promotionSchema = new mongoose.Schema<IPromotion>({
  image: { type: String, required: true },
  alt: { type: String },
  seo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPromotion>("promotion", promotionSchema);
