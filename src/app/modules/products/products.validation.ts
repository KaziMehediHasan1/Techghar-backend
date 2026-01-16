import * as zod from "zod";

export const zodProductValidation = zod.object({
  body: zod.object({
    stock: zod.boolean().default(false),
    quantity: zod.number().default(0),
    images: zod
      .array(zod.string().url())
      .min(1, "At least one product image is required"),
    review: zod.number().default(0),
    title: zod.string().min(3).max(120),
    description: zod.string().min(10),
    discount: zod.number(),
    price: zod.number().positive(),
  }),
});
