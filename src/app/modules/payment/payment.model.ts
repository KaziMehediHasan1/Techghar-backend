import type { IPayment } from "@/app/modules/payment/payment.interface.js";
import { Schema, model } from "mongoose";

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },

    paymentMethod: {
      type: String,
      enum: ["stripe", "sslcommerz", "paypal", "cash_on_delivery"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    transactionId: { type: String, required: true, unique: true },

    currency: { type: String, default: "BDT" },
    amount: { type: Number, required: true },

    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],

    paymentGatewayResponse: {
      type: Schema.Types.Mixed,
    },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
