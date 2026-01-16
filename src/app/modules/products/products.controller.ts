import catchAsync from "@/app/utils/catchAsync.js";

const createProduct = catchAsync(async (req, res) => {});

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
