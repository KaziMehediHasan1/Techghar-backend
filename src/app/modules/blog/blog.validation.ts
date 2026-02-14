import * as zod from "zod";

export const zodBlogValidation = zod.object({
  body: zod.object({
    image: zod.array(zod.string()),
    title: zod.string(),
    description: zod.string(),
    alt: zod.string(),
    category: zod.string(),
    embedding: zod.array(zod.string()),
  }),
});
