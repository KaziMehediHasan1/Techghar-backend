import mongoose from "mongoose";
import type { IUserSchema } from "./user.interface.js";

const userSchema = new mongoose.Schema<IUserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserSchema>("user", userSchema);
