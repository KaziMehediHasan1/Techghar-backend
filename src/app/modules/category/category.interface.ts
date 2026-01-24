import type mongoose from "mongoose";

export interface IContact {
  name: string;
  email: string;
  id: mongoose.Schema.Types.ObjectId;
  phone: string;
  description: string;
}
