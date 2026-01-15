import * as zod from "zod";

const addressValidationSchema = zod.object({
  fullName: zod.string().min(1, "Full name is required"),
  street: zod.string().optional(),
  city: zod.string().min(1, "City is required"),
  state: zod.string().min(1, "State is required"),
  zipCode: zod.string().min(1, "Zip code is required"),
  phone: zod.string().min(1, "Phone number is required"),
  isDefaultBilling: zod.boolean().default(false),
  isDefaultShipping: zod.boolean().default(false),
});

export const zodProfileValidation = zod.object({
  body: zod.object({
    userID: zod.string({ error: "user id is required" }),
    addresss: zod.array(addressValidationSchema),
    orders: zod.array(zod.string()).default([]),
    wishlist: zod.array(zod.string()).default([]),
    reviews: zod.array(zod.string()).default([]),
  }),
});
