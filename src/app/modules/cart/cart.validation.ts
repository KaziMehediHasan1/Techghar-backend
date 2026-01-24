import * as zod from "zod";

export const zodAddToCardDataValidation = zod.object({
  body: zod.object({
    name: zod.string(),
    image: zod.string(),
    price: zod.string() || zod.number(),
    category: zod.string(),
    productId: zod.string(),
  }),
});
