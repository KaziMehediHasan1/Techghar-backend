import { z } from "zod";
import { embeddings } from "@/app/modules/chatbot/bot.utils.js";
import { tool } from "@langchain/core/tools";
import productsModel from "@/app/modules/products/products.model.js";

export const productLookupTool = tool(
  async ({ query }) => {
    try {
      // 1. Vactore search aggregation  (Mongoose style)
      const vectorResults = await productsModel.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: await embeddings.embedQuery(query),
            numCandidates: 100,
            limit: 3,
          },
        },
      ]);

      // ২. যদি ভেক্টর সার্চে কিছু না পাওয়া যায়, তবে টেক্সট সার্চ (Fallback)
      if (vectorResults.length === 0) {
        const fallbackResults = await productsModel
          .find({
            embedding_text: { $regex: query, $options: "i" },
          })
          .select("title price description category brand")
          .limit(3)
          .lean();

        return JSON.stringify(fallbackResults);
      }

      return JSON.stringify(vectorResults);
    } catch (error) {
      return "No products found matching your request.";
    }
  },
  {
    name: "item_lookup",
    description:
      "Searches inventory for products using vector and text search.",
    schema: z.object({ query: z.string() }),
  },
);
