import type mongoose from "mongoose";

export type PaymentMethod =
  | "stripe"
  | "sslcommerz"
  | "paypal"
  | "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface IPayment {
  userId: mongoose.Schema.Types.ObjectId;

  // Order reference
  orderId: mongoose.Schema.Types.ObjectId;

  // Payment info
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  transactionId: string; // Stripe session ID / SSLCommerz tran_id
  currency: string; // USD, BDT
  amount: number;

  // Product snapshot (important for admin & history)
  products: {
    productId: mongoose.Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];

  // Gateway response (for debugging & admin panel)
  paymentGatewayResponse?: Record<string, any>;

  // Who processed it
  isPaid: boolean;
  paidAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
