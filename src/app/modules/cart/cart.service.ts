import cartModel from "@/app/modules/cart/cart.model.js";
import AppError from "@/utils/appError.js";

const createAddToCartDataIntoDB = async (payload: any) => {
  const checkProductExist = await cartModel.find({
    productId: payload.productId,
  });
  if (checkProductExist) {
    throw new AppError(404, "product is already exist");
  }
  const result = await cartModel.create(payload);
  if (!result) {
    throw new AppError(404, "product are not adding your cart");
  }
  return result;
};

const getCartDataIntoDB = async (payload: string) => {
  const result = await cartModel.findById({ _id: payload });
  if (!result) {
    throw new AppError(404, "not found this cart item");
  }
  return result;
};

const getCartDatasIntoDB = async () => {
  const result = await cartModel.find();
  if (!result) {
    throw new AppError(404, "not found this cart item");
  }
  return result;
};

const deleteCartDataIntoDB = async (payload: string) => {
  const result = await cartModel.findByIdAndDelete(payload);
  if (!result) {
    throw new AppError(404, "not delete this cart item");
  }
  return result;
};

export const cartService = {
  createAddToCartDataIntoDB,
  getCartDataIntoDB,
  getCartDatasIntoDB,
  deleteCartDataIntoDB,
};
