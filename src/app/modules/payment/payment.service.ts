import config from "@/config/index.js";
import Stripe from "stripe";
const stripe = new Stripe(config.payment.stripe_secret as string);

const createPaymentIntentIntoStripe = async (payload: any) => {
  console.log("Payload", payload)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount,
    currency: payload.currency || "usd",
    automatic_payment_methods: { enabled: true },
  });

  const productIds = payload.productID;
  console.log(productIds,"chck idd")

  // if (!paymentIntent) {
  //   throw new AppError(
  //     ERROR_MESSAGES.auth.registrationFailed.statusCode,
  //     ERROR_MESSAGES.auth.registrationFailed.message,
  //   );
  // }

  const clientSecret = paymentIntent.client_secret;

  return { clientSecret: clientSecret };
};

const createPaymentIntoDB = async (payload: any) => { };

const getAllPaymentsDataIntoDB = async (payload: any) => { };

const getPaymentDataIntoDB = async (payload: any) => { };

const updatePaymentDataIntoDB = async (payload: any) => { };

const deletePaymentDataIntoDB = async (payload: any) => { };

export const paymentService = {
  createPaymentIntentIntoStripe,
  createPaymentIntoDB,
  getAllPaymentsDataIntoDB,
  getPaymentDataIntoDB,
  updatePaymentDataIntoDB,
  deletePaymentDataIntoDB,
};
