import { productService } from "@/app/modules/products/products.service.js";
import catchAsync from "@/app/utils/catchAsync.js";
import sendResponse from "@/app/utils/sendResponse.js";
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

const getAllProduct = catchAsync(async (req, res) => {});

const getProduct = catchAsync(async (req, res) => {});

const updateProduct = catchAsync(async (req, res) => {});

const deleteProduct = catchAsync(async (req, res) => {});

export const productController = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
