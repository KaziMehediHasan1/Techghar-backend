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

const getAllCoupon = catchAsync(async (_, res) => {
  const result = await couponService.getAllCouponIntoDB();
  sendResponse(res, {
    statusCode: 200,
    message: "Coupon created successfull",
    success: true,
    data: result,
  });
});

const getCoupon = catchAsync(async (req, res) => {
  const result = await couponService.getCouponIntoDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: "Coupon created successfull",
    success: true,
    data: result,
  });
});

const updateCoupon = catchAsync(async (req, res) => {});

const deleteCoupon = catchAsync(async (req, res) => {
  const result = await couponService.deleteCouponIntoDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Coupon deleted successfull",
    success: true,
    data: result,
  });
});

export const couponController = {
  createCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};
