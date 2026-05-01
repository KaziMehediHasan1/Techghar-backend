import config from "@/config/index.js";
import Stripe from "stripe";
import paymentModel from "./payment.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";
const stripe = new Stripe(config.payment.stripe_secret as string);

const createPaymentIntentIntoStripe = async (payload: any) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: payload.currency || "usd",
    automatic_payment_methods: { enabled: true },
  });

  const productIds = payload;

  if (!paymentIntent) {
    throw new AppError(
      ERROR_MESSAGES.payment.declined.statusCode,
      ERROR_MESSAGES.payment.declined.message,
    );
  }

  const clientSecret = paymentIntent.client_secret;

  return { clientSecret: clientSecret };
};

const createPaymentIntoDB = async (payload: any) => {
  const result = await paymentModel.create(payload);
  console.log("payload", payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.payment.failed.statusCode,
      ERROR_MESSAGES.payment.failed.message,
    );
  }
  return result;
};

const getAllPaymentsDataIntoDB = async () => {
  const result = await paymentModel.find();
  // if (!result) {
  //   throw new AppError(
  //     ERROR_MESSAGES.payment.notFound.statusCode,
  //     ERROR_MESSAGES.payment.notFound.message,
  //   );
  // }
  return result;
};

const getPaymentDataIntoDB = async (payload: any) => {};

const updatePaymentDataIntoDB = async (payload: any) => {};

const deletePaymentDataIntoDB = async (payload: any) => {};

export const paymentService = {
  createPaymentIntentIntoStripe,
  createPaymentIntoDB,
  getAllPaymentsDataIntoDB,
  getPaymentDataIntoDB,
  updatePaymentDataIntoDB,
  deletePaymentDataIntoDB,
};
