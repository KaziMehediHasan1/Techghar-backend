import { brandService } from "@/app/modules/brand/brand.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createBrandData = catchAsync(async (req, res) => {
  const result = await brandService.createBrandDataIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Brand Added Successfull",
    success: true,
    data: result, // just for check
  });
});

const getAllBrandData = catchAsync(async (req, res) => {});

const getBrandData = catchAsync(async (req, res) => {});

const updateBrandData = catchAsync(async (req, res) => {});

const deleteBrandData = catchAsync(async (req, res) => {});

export const brandController = {
  createBrandData,
  getAllBrandData,
  getBrandData,
  updateBrandData,
  deleteBrandData,
};
