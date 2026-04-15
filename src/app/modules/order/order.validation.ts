import * as zod from "zod";

export const zodOrderValidation = zod.object({
  body: zod.object({
    productID: zod.array(zod.string()),
    quantity: zod.number(),
    colors: zod.string().optional(),
    price: zod.number()
  }),
});
