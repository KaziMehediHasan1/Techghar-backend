import type mongoose from "mongoose";

export interface IOrder {
  userId: mongoose.Schema.Types.ObjectId;
  productID: mongoose.Schema.Types.ObjectId[] | mongoose.Schema.Types.ObjectId;
  quantity: number;
  colors: string;
  status: string;
  price: number;
  cancelledBy: string;
  cancelledAt: Date;
  embedding: number[];
  embedding_text: string;
}
