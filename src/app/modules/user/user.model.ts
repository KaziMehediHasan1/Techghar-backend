import type { IUserSchema } from "@/app/modules/user/user.interface.js";
import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      default: () => "UID-" + uuidv7(),
    },
    gender: { type: String, enum: ["male", "female"] },
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: String },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
    photo: { type: String, default: "https://ibb.co.com/KjDjpmp8" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    embedding: { type: [Number], default: [] },
    embedding_text: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IUserSchema>("User", userSchema);
