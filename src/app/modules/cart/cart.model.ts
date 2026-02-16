import type { ICart } from "@/app/modules/cart/cart.interface.js";
import mongoose from "mongoose";

const AddToCartSchema = new mongoose.Schema<ICart>({
  productId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, requried: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  embedding: {
    type: [Number],
    default: [],
  },
});

export default mongoose.model<ICart>("Cart", AddToCartSchema);
