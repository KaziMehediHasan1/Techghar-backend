import type { ICoupon } from "@/app/modules/coupon/coupon.interface.js";
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: {
      type: String,
      unique: true,
      uppercase: true,
      required: true,
    },

    discountType: {
      type: String,
      enum: ["PERCENT", "FLAT"], // 10% or 200 taka
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    maxUsage: {
      type: Number, // total usage
      default: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICoupon>("coupon", couponSchema);
