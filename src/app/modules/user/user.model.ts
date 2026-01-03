import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { IUserSchema } from "./user.interface.js";

const userSchema = new mongoose.Schema<IUserSchema>({
  uid: {
    type: String,
    required: true,
    unique: true,
    default: () => "UID-" + uuidv4(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserSchema>("user", userSchema);
