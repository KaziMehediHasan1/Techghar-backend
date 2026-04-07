import * as zod from "zod";

export const reviewZodSchema = zod.object({
  body: zod.object({
    userId: zod.string(),
    productId: zod.string(),
    rating: zod.number().min(1).max(5),
    comment: zod.string().min(1, "minimum write 2 words"),
    shortComment: zod.string().optional(),
    isVerifiedPurchase: zod.boolean().default(false),
    isApproved: zod.boolean().default(false),
  }),
});
