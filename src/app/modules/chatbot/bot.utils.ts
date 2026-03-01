import config from "@/config/index.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Model, Document } from "mongoose";

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: config.ai.apiKey as string,
});

// Interface for documents that need embedding
interface IBaseEmbeddable {
  embedding: number[];
  embedding_text?: string;
}

export async function genericSyncEmbeddings<T>(
  model: Model<any>,
  generateText: (doc: T) => string | Promise<string>, 
  populatePath?: string,
) {
  
  let query = model.find({
    $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }],
  });

  if (populatePath) {
    query = query.populate(populatePath);
  }

  const docs = await query.limit(20);

  for (const doc of docs) {
    try {
      const combinedText = await generateText(doc as any);
      (doc as any).embedding_text = combinedText;
      (doc as any).embedding = await embeddings.embedQuery(combinedText);
      await doc.save();
    } catch (error) {
      console.error(`Error syncing ${model.modelName}:`, error);
    }
  }
}
