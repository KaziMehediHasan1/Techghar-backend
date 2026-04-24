import * as zod from "zod";

export const createUserZodSchema = zod.object({
  body: zod.object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().optional(),
    email: zod.string().email("Email must be a valid email address"),
    password: zod
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
        "Password must contain at least one letter and one number"
      ),
    gender: zod.enum(["male", "female"]).optional(),
    dob: zod.string().optional(),
    phone: zod.string().optional(),
    photo: zod.string().url("Photo must be a valid URL").optional(),
    role: zod.enum(["admin", "user"]).default("user"),
  }),
});

export const updateUserZodSchema = zod.object({
  body: zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    gender: zod.enum(["male", "female"]).optional(),
    dob: zod.string().optional(),
    phone: zod.string().optional(),
    photo: zod.string().url().optional(),
    password: zod.string().optional()
  }),
});