import type { IProfile } from "@/app/modules/profile/profile.interface.js";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: { type: String, },
  street: { type: String },
  city: { type: String, },
  state: { type: String, },
  zipCode: { type: String, },
  phone: { type: String, },
  isDefaultBilling: { type: Boolean, default: false },
  isDefaultShipping: { type: Boolean, default: false },
});

const profileAddressSchema = new mongoose.Schema<IProfile>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
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
