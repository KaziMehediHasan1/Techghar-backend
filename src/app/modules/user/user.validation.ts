import * as zod from "zod";

export const createUserZodSchema = zod.object({
  body: zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Email must be a valid email address"),
    password: zod
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
        "Password must contain at least one letter and one number"
      ),

    role: zod.enum(["admin", "user"]).default("user"),
  }),
});
