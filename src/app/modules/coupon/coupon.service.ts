import couponModel from "@/app/modules/coupon/coupon.model.js";
import AppError from "@/app/utils/appError.js";

const createCouponIntoDB = async (payload: any) => {
  const result = await couponModel.create(payload);
  if (!result) {
    throw new AppError(404, "Coupon creating fail! try again..");
  }
  return result;
};

const getAllCouponIntoDB = async (payload: any) => {};

const getCouponIntoDB = async (payload: any) => {};

const updateCouponIntoDB = async (payload: any) => {};

const deleteCouponIntoDB = async (payload: any) => {};

export const couponService = {
  createCouponIntoDB,
  getAllCouponIntoDB,
  getCouponIntoDB,
  updateCouponIntoDB,
  deleteCouponIntoDB,
};
