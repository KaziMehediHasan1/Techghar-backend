import mongoose from "mongoose";
import type { IProfile } from "./profile.interface.js";

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  isDefaultBilling: { type: Boolean, default: false },
  isDefaultShipping: { type: Boolean, default: false },
});

const profileSchema = new mongoose.Schema<IProfile>(
  {
    userID: { type: String, required: true },
    addresss: [addressSchema],
    orders: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
    reviews: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("profile", profileSchema);
