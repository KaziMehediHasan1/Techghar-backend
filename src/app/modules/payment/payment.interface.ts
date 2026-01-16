import type mongoose from "mongoose";

export interface IPayment {
  userID: mongoose.Schema.Types.ObjectId;
  
}
