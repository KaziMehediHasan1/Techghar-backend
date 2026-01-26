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

const getAllBrandDataIntoDB = async () => {
  const result = await brandModel.find();
  if (!result) {
    throw new AppError(404, "Not get all brands data");
  }
  return result;
};

const getBrandDataIntoDB = async (payload: any) => {
  const result = await brandModel.findById({ _id: payload });
  if (!result) {
    throw new AppError(404, "Not get brand data");
  }
  return result;
};

const updateBrandDataIntoDB = async (payload: any) => {
  const result = await brandModel.findByIdAndUpdate(
    { _id: payload.id },
    { $set: payload.data },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, "Not updated brand data");
  }
  return result;
};

const deleteBrandDataIntoDB = async (payload: string) => {
  const result = await brandModel.findByIdAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(404, "Not deletion brand data");
  }
  return result;
};

export const brandService = {
  createBrandDataIntoDB,
  getAllBrandDataIntoDB,
  getBrandDataIntoDB,
  updateBrandDataIntoDB,
  deleteBrandDataIntoDB,
};
