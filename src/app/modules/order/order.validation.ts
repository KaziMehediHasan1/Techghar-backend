import * as zod from "zod";

export const zodOrderValidation = zod.object({
  body: zod.object({
    productID: zod.string(),
    quantity: zod.number(),
    colors: zod.string(),
  }),
});
