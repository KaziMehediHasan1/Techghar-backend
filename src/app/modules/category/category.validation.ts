import * as zod from "zod";

export const zodContactValidation = zod.object({
  body: zod.object({
    name: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    userId: zod.string(),
    description: zod.string().min(10, "minimum 10 letter"),
  }),
});
