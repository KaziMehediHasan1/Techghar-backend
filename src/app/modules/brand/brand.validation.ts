import * as zod from "zod";
export const zodBrandValidation = zod.object({
  body: zod.object({
    name: zod.string(),
    category: zod.string(),
    logo: zod.array(zod.string()),
  }),
});
