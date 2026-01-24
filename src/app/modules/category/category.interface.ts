import type mongoose from "mongoose";

export interface IContact {
  name: string;
  email: string;
  userId: mongoose.Schema.Types.ObjectId;
  phone: string;
  description: string;
}
