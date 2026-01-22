import mongoose from "mongoose";
import * as zod from "zod";

export const zodCouponValidation = zod.object({
  body: zod.object({
    code: zod.string(),
    discountType: zod.enum(["PERCENT", "FLAT"]),
    discountValue: zod.number(),
    minOrderAmount: zod.number().optional(),
    expiryDate: zod.string().transform((str: string | number | Date) => new Date(str)),
    maxUsage: zod.number(),
    usedCount: zod.number(),
    allowedUsers: zod.array(zod.string()).optional().default([]),
    isActive: zod.boolean().optional(),
  }),
});
