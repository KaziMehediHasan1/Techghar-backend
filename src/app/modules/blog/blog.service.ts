import blogModel from "@/app/modules/blog/blog.model.js";
import AppError from "@/utils/appError.js";

const createBlogIntoDB = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

const getAllBlogIntoDB = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

const getBlogIntoDB = async (payload: any) => {};

const updateBlogIntoDB = async (payload: any) => {};

const deleteBlogIntoDB = async (payload: any) => {};

export const blogService = {
  createBlogIntoDB,
  getAllBlogIntoDB,
  getBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
