import mongoose from "mongoose";
import type { IUserSchema } from "./cart.interface.js";

const userSchema = new mongoose.Schema<IUserSchema>({
  name: { type: String, required: true },
  
});

export default mongoose.model<IUserSchema>("user", userSchema);
