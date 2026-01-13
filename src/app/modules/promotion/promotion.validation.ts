import * as zod from "zod";

export const promotionValidation = zod.object({
  body: zod.object({
    image: zod.string(),
    alt: zod.string().optional(),
    seo: zod.string(),
  }),
});
