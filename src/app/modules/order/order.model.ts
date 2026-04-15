import type { IOrder } from "@/app/modules/order/order.interface.js";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    productID: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    colors: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "shipped", "delivered"],
      default: "pending",
    },
    cancelledBy: {
      type: String,
      enum: ["user", "admin"],
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
    embedding: { type: [Number], default: [] },
    embedding_text: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>("Order", orderSchema);
