import type { IProduct } from "@/app/modules/products/products.interface.js";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true, index: true },
    category: {
      type: String,
      required: true,
      index: true,
      enum: ["Headphone", "PC Componet", "Light", "Monitor", "Phone"],
    },
    colors: { type: String, required: true, default: "Black", index: true },
    brand: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },
    stock: { type: Boolean, default: true, index: true },
    quantity: { type: Number, default: 0, index: true },
    images: {
      type: [String],
      required: true,
    },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// searching index ---
productSchema.index({ title: "text", brand: "text", category: "text" });

// --- Multi-key Index for Filtering ---
productSchema.index({ category: 1, price: 1, brand: 1, colors: 1 });

export default mongoose.model<IProduct>("Product", productSchema);
