import productsModel from "@/app/modules/products/products.model.js";
import AppError from "@/utils/appError.js";
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

const getAllProductsIntoDB = async (payload: any) => {
  const { search, price, category, brand, colors, cursor } = payload;
  let query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }
  if (price) {
    query.price = { $lte: price };
  }
  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }
  if (colors) {
    query.colors = colors;
  }

  // cursor / infinity based pagination -
  if (cursor) {
    query._id = { $lt: cursor };
  }
  const result = await productsModel.find(query).sort({ _id: -1 }).limit(4);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.fetchAll.statusCode,
      ERROR_MESSAGES.product.fetchAll.message,
    );
  }
  return result;
};

const getProductIntoDB = async (payload: string) => {
  const result = await productsModel.findById(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.get.statusCode,
      ERROR_MESSAGES.product.get.message,
    );
  }
  return result;
};

const deleteProductIntoDB = async (payload: string) => {
  const result = await productsModel.findOneAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.delete.statusCode,
      ERROR_MESSAGES.product.delete.message,
    );
  }
  return result;
};

const updateProductIntoDB = async (payload: any) => {
  const { id, data } = payload;
  if (!data) {
    throw new AppError(400, "Please given your updated data.");
  }
  const result = await productsModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.update.statusCode,
      ERROR_MESSAGES.product.update.message,
    );
  }
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
};
