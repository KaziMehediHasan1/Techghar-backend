import mongoose from "mongoose";
import * as zod from "zod";

const objectId = zod
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const productSchema = zod.object({
  productId: objectId,
  name: zod.string().min(1),
  quantity: zod.number().int().positive(),
  price: zod.number().positive(),
});

export const zododPaymentValidation = zod.object({
  body: zod
    .object({
      userId: objectId,
      orderId: objectId,

      paymentMethod: zod.enum(["stripe", "sslcommerzod", "cash_on_delivery"]),
      paymentStatus: zod.enum(["pending", "paid", "failed", "refunded"]),

      transactionId: zod.string().min(1),
      currency: zod.string().length(3),
      amount: zod.number().positive(),

      products: zod.array(productSchema).min(1),

      isPaid: zod.boolean(),
      paidAt: zod.coerce.date().optional(),

      createdAt: zod.coerce.date().optional(),
      updatedAt: zod.coerce.date().optional(),
    })
    .refine((data) => data.isPaid === false || data.paymentStatus === "paid", {
      message: "when isPaid = true, then set paymentstatus isPaid",
      path: ["isPaid"],
    }),
});
