import brandModel from "@/app/modules/brand/brand.model.js";
import AppError from "@/utils/appError.js";

const createBrandDataIntoDB = async (payload: any) => {
  const checkBrandIsExist = await brandModel.find(payload);
  if (checkBrandIsExist) {
    throw new AppError(400, "already have, add another one");
  }
  const result = await brandModel.create(payload);
  if (!result) {
    throw new AppError(404, "Not create brand data");
  }
  return result;
};

const getAllBrandDataIntoDB = async (payload: any) => {};

const getBrandDataIntoDB = async (payload: any) => {};

const updateBrandDataIntoDB = async (payload: any) => {};

const deleteBrandDataIntoDB = async (payload: any) => {};

export const brandService = {
  createBrandDataIntoDB,
  getAllBrandDataIntoDB,
  getBrandDataIntoDB,
  updateBrandDataIntoDB,
  deleteBrandDataIntoDB,
};
