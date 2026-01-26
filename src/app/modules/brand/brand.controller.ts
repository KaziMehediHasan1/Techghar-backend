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

const getAllBrandData = catchAsync(async (_, res) => {
  const result = await brandService.getAllBrandDataIntoDB();
  sendResponse(res, {
    statusCode: 200,
    message: "Brand get Successfull",
    success: true,
    data: result,
  });
});

const getBrandData = catchAsync(async (req, res) => {
  const result = await brandService.getBrandDataIntoDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: "Brand get Successfull",
    success: true,
    data: result,
  });
});

const updateBrandData = catchAsync(async (req, res) => {
  const result = await brandService.updateBrandDataIntoDB({
    id: req.params.id as string,
    data: req.body,
  });
  sendResponse(res, {
    statusCode: 200,
    message: "Brand update data Successfull",
    success: true,
    data: result,
  });
});

const deleteBrandData = catchAsync(async (req, res) => {
  const result = await brandService.deleteBrandDataIntoDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Brand delete data Successfull",
    success: true,
    data: result,
  });
});

export const brandController = {
  createBrandData,
  getAllBrandData,
  getBrandData,
  updateBrandData,
  deleteBrandData,
};
