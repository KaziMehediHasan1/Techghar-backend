import type mongoose from "mongoose";

export type PaymentMethod = "stripe" | "sslcommerz" | "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type Currency = "USD" | "BDT";

export interface IPayment {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  transactionId?: string;
  currency: Currency;
  amount: number;

  products: {
    productId: mongoose.Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];

  paymentGatewayResponse?: Record<string, any>;

  isPaid: boolean;
  paidAt?: Date;
  embedding: { type: number[] };

  createdAt?: Date;
  updatedAt?: Date;
}
