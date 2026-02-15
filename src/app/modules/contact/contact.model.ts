import type { IContact } from "@/app/modules/contact/comtact.interface.js";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IContact>("Contact", contactSchema);
