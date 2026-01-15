import type { IUserSchema } from "@/app/modules/user/user.interface.js";
import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";


const userSchema = new mongoose.Schema<IUserSchema>({
  uid: {
    type: String,
    required: true,
    unique: true,
    default: () => "UID-" + uuidv7(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  photo: { type: String, default: "https://ibb.co.com/KjDjpmp8" },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserSchema>("user", userSchema);
