import type { IOrder } from "@/app/modules/order/order.interface.js";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    colors: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
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
    embedding: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>("Order", orderSchema);
