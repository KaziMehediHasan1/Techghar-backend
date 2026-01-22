import { couponService } from "@/app/modules/coupon/coupon.service.js";
import catchAsync from "@/app/utils/catchAsync.js";
import sendResponse from "@/app/utils/sendResponse.js";

const createCoupon = catchAsync(async (req, res) => {
  const result = await couponService.createCouponIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Coupon created successfull",
    success: true,
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req, res) => {});

const getCoupon = catchAsync(async (req, res) => {});

const updateCoupon = catchAsync(async (req, res) => {});

const deleteCoupon = catchAsync(async (req, res) => {});

export const couponController = {
  createCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
