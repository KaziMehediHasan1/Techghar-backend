import { productService } from "@/app/modules/products/products.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";

const createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.created.statusCode,
    message: SUCCESS_MESSAGES.product.created.message,
    success: true,
    data: result,
  });
});

const getAllProduct = catchAsync(async (_, res) => {
  const result = await productService.getAllProductsIntoDB();
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.fetched.statusCode,
    message: SUCCESS_MESSAGES.product.fetched.message,
    success: true,
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.getProductIntoDB(id as string);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.fetched.statusCode,
    message: SUCCESS_MESSAGES.product.fetched.message,
    success: true,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await productService.deleteProductIntoDB(id);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.deleted.statusCode,
    message: SUCCESS_MESSAGES.product.deleted.message,
    success: true,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await productService.updateProductIntoDB({ id, data });
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.updated.statusCode,
    message: SUCCESS_MESSAGES.product.updated.message,
    success: true,
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
