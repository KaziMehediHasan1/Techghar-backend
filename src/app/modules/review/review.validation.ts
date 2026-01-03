import * as zod from "zod";

export const reviewZodSchema = zod.object({
  body: zod.object({
    uid:zod.string(),
    reviewer: zod.string(),
    description: zod.string().min(5, "minimum use 5 letter of words"),
  }),
});
