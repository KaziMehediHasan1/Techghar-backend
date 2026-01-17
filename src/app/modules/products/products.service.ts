import productsModel from "@/app/modules/products/products.model.js";
import AppError from "@/app/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";

const createProductIntoDB = async (payload: any) => {
  const result = await productsModel.create(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.create.statusCode,
      ERROR_MESSAGES.product.create.message,
    );
  }
  return result;
};

const getAllProductsIntoDB = async (payload: any) => {};

const getProductIntoDB = async (payload: string) => {};

const deleteProductIntoDB = async (payload: string) => {};

const updateProductIntoDB = async (payload: any) => {};

export const productService = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
};
