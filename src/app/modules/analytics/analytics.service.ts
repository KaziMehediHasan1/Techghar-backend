import blogModel from "@/app/modules/blog/blog.model.js";
import AppError from "@/utils/appError.js";


const createAnalyticsIntoDB = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

const getAnalyticsIntoDB = async (payload: any) => {
  const result = await blogModel.findById(payload);
  if (!result) {
    throw new AppError(404, "not get blog data");
  }
  return result;
};

const deleteAnalyticsIntoDB = async (payload: any) => {
  const result = await blogModel.findByIdAndDelete(payload);
  if (!result) {
    throw new AppError(404, "not deleted blog data");
  }
  return result;
};

export const blogService = {
  createAnalyticsIntoDB,
  getAnalyticsIntoDB,
  deleteAnalyticsIntoDB,
};
