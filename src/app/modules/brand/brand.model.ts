import type { IBrand } from "@/app/modules/brand/brand.interface.js";
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema<IBrand>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  logo: { type: [String], required: true },
});

export default mongoose.model<IBrand>("Brand", brandSchema);
