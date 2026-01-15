import type { IProfile } from "@/app/modules/profile/profile.interface.js";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  isDefaultBilling: { type: Boolean, default: false },
  isDefaultShipping: { type: Boolean, default: false },
});

const profileAddressSchema = new mongoose.Schema<IProfile>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
      unique: true,
    },
    addresss: [addressSchema],
    orders: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
    reviews: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("profile", profileAddressSchema);
