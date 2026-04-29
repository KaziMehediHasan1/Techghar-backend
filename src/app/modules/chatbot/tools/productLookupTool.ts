import { z } from "zod";
import { embeddings } from "@/app/modules/chatbot/bot.utils.js";
import { tool } from "@langchain/core/tools";
import productsModel from "@/app/modules/products/products.model.js";

export const productLookupTool = tool(
  async ({ query }) => {
    console.log("🔍 Tool calling with query:", query);
    try {
      const vectorResults = await productsModel.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: await embeddings.embedQuery(query),
            numCandidates: 100,
            limit: 5,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            brand: 1,
            category: 1,
            description: 1,
            price: 1,
            finalPrice: 1,
            discount: 1,
            stock: 1,
            quantity: 1,
            images: 1,
            averageRating: 1,
            totalReviews: 1,
            features: 1,
            warranty: 1,
            specs: 1,
            colors: 1,
            isActive: 1,
          },
        },
        {
          $match: { isActive: true },
        },
      ]);
      console.log("✅ Results found:", vectorResults.length);
      if (vectorResults.length === 0) {
        const fallback = await productsModel
          .find({
            isActive: true,
            $or: [
              { title: { $regex: query, $options: "i" } },
              { brand: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } },
            ],
          })
          .select(
            "title brand category price finalPrice discount stock quantity images averageRating totalReviews features warranty specs colors",
          )
          .limit(5)
          .lean();

        if (fallback.length === 0) return "এই পণ্য এখন স্টকে নেই।";
        return JSON.stringify(fallback);
      }

      return JSON.stringify(vectorResults);
    } catch (error) {
      console.error("❌ Tool error:", error);
      return "পণ্য খুঁজতে সমস্যা হচ্ছে।";
    }
  },
  {
    name: "item_lookup",
    description:
      "ALWAYS use this tool when user asks for any electronics product, laptop, phone, monitor, tablet or accessories from TechGhar inventory.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "Product to search for (e.g., 'gaming laptop', 'Samsung phone')",
        ),
    }),
  },
);
