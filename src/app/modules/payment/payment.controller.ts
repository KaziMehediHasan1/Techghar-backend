import catchAsync from "@/utils/catchAsync.js";

const createPayment = catchAsync(async (req, res) => {});

const getAllPaymentsData = catchAsync(async (req, res) => {});

const getPaymentData = catchAsync(async (req, res) => {});

const updatePaymentData = catchAsync(async (req, res) => {});

const deletePaymentData = catchAsync(async (req, res) => {});

export const paymentController = {
  createPayment,
  getAllPaymentsData,
  getPaymentData,
  updatePaymentData,
  deletePaymentData,
};
