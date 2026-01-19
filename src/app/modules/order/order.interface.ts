import type mongoose from "mongoose";

export interface IOrder {
  productID: mongoose.Schema.Types.ObjectId;
  quantity: number;
  colors: string;
}
