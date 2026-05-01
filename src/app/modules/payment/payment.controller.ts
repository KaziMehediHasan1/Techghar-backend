import { paymentService } from "@/app/modules/payment/payment.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createPaymentIntent = catchAsync(async (req, res) => {
  const { amount, currency, productID } = req.body;
  const result = await paymentService.createPaymentIntentIntoStripe({
    amount,
    currency,
    productID,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment intent successfull",
    data: result,
  });
});

const createPayment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await paymentService.createPaymentIntoDB(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment Details Save DB",
    data: result,
  });
});

const getAllPaymentsData = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPaymentsDataIntoDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payments fetched successfully",
    data: result,
  });
});

const getPaymentData = catchAsync(async (req, res) => {});

const updatePaymentData = catchAsync(async (req, res) => {});

const deletePaymentData = catchAsync(async (req, res) => {});

export const paymentController = {
  createPaymentIntent,
  createPayment,
  getAllPaymentsData,
  getPaymentData,
  updatePaymentData,
  deletePaymentData,
};
