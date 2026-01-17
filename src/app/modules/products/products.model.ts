import type { IProduct } from "@/app/modules/products/products.interface.js";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      // enum: ["Headphone", "PC Componet", "Light", "Monitor","Phone"],
    },
    colors: { type: String, required: true, default: "Black" },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },
    stock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
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

export default mongoose.model<IProduct>("Product", productSchema);
