import * as zod from "zod";

export const reviewZodSchema = zod.object({
  body: zod.object({
    userId: zod.string(),
    productId: zod.string(),
    rating: zod.number(),
    comment: zod.string().min(1, "minimum write 2 words"),
    isVerifiedPurchase: zod.boolean().default(false),
    isApproved: zod.boolean().default(false),
  }),
});
