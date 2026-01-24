import type { IContact } from "@/app/modules/category/category.interface.js";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IContact>("Contact", contactSchema);
