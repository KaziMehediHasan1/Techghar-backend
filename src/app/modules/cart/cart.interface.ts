import type mongoose from "mongoose";

export interface ICart {
  productId?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  image: string;
  name: string;
  price: string;
  category: string;
}
