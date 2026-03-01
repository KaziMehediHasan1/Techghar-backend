import { embeddings } from "@/app/modules/chatbot/bot.utils.js";
import type { IProduct } from "@/app/modules/products/products.interface.js";
import mongoose, { type CallbackWithoutResultAndOptionalError } from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true, index: true },
    category: {
      type: String,
      required: true,
      index: true,
      enum: ["Headphone", "PC Componet", "Light", "Monitor", "Phone", "PC"],
    },
    colors: { type: String, required: true, default: "Black", index: true },
    brand: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },
    stock: { type: Boolean, default: true, index: true },
    quantity: { type: Number, default: 0, index: true },
    images: {
      type: [String],
      required: true,
    },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    embedding: { type: [Number], default: [] },
    embedding_text: { type: String },
  },
  { timestamps: true },
);

// searching index ---
productSchema.index({ title: "text", brand: "text", category: "text" });
productSchema.virtual("reviews", {
  ref: "review", // Review model-er naam
  localField: "_id",
  foreignField: "productId", // Review model-e je field-e product id ache
});
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });
// --- Multi-key Index for Filtering ---
productSchema.index({ category: 1, price: 1, brand: 1, colors: 1 });

// middleware for embeding -
// 'next' shoriye async/await pattern follow koro
productSchema.pre<IProduct & mongoose.Document>(
  "save",
  async function (this: IProduct & mongoose.Document) {
    if (
      this.isModified("title") ||
      this.isModified("description") ||
      this.isNew
    ) {
      try {
        const combinedText = `Title: ${this.title} | Brand: ${this.brand} | Description: ${this.description}`;
        this.embedding_text = combinedText;

        // Langchain query call
        this.embedding = await embeddings.embedQuery(combinedText);
      } catch (error) {
        console.error("Embedding error during pre-save:", error);
      
      }
    }
    // Async function-e next() dorkar nei
  },
);

export default mongoose.model<IProduct>("Product", productSchema);
