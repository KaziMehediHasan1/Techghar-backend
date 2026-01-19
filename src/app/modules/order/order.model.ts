import type { IOrder } from "@/app/modules/order/order.interface.js";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    colors: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>("order", orderSchema);
