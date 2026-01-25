import cartModel from "@/app/modules/cart/cart.model.js";
import AppError from "@/utils/appError.js";

const createAddToCartDataIntoDB = async (payload: any) => {
  const result = await cartModel.create(payload);
  if (!result) {
    throw new AppError(404, "product are not adding your cart");
  }
  return result;
};

const getCartDataIntoDB = async (payload: any) => {};

const getCartsDataIntoDB = async (payload: any) => {};

const deleteCartDataIntoDB = async (payload: any) => {};

export const cartService = {
  createAddToCartDataIntoDB,
  getCartDataIntoDB,
  getCartsDataIntoDB,
  deleteCartDataIntoDB,
};
