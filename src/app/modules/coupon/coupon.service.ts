import couponModel from "@/app/modules/coupon/coupon.model.js";
import AppError from "@/app/utils/appError.js";

const createCouponIntoDB = async (payload: any) => {
  const result = await couponModel.create(payload);
  if (!result) {
    throw new AppError(404, "Coupon creating fail! try again..");
  }
  return result;
};

const getAllCouponIntoDB = async () => {
  const result = await couponModel.find();
  const total = result.length;
  if (!result && total) {
    throw new AppError(404, "Coupon getting fail!");
  }
  return { result, total };
};

const getCouponIntoDB = async (payload: string) => {
  const result = await couponModel.findById({ _id: payload });
  if (!result) {
    throw new AppError(404, "Coupon not found");
  }
  return result;
};

const updateCouponIntoDB = async (payload: any) => {};

const deleteCouponIntoDB = async (payload: any) => {};

export const couponService = {
  createCouponIntoDB,
  getAllCouponIntoDB,
  getCouponIntoDB,
  updateCouponIntoDB,
  deleteCouponIntoDB,
};
