import type { IBlog } from "@/app/modules/blog/blog.interface.js";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    image: { type: [String], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
