import blogModel from "@/app/modules/blog/blog.model.js";
import AppError from "@/utils/appError.js";

const createBlogIntoDB = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

const getAllBlogIntoDB = async () => {
  const result = await blogModel.find();
  const total = result.length;
  if (!result) {
    throw new AppError(404, "not get blogs");
  }
  return { result, total };
};

const getBlogIntoDB = async (payload: any) => {
  const result = await blogModel.findById(payload);
  if (!result) {
    throw new AppError(404, "not get blog data");
  }
  return result;
};

const updateBlogIntoDB = async (payload: any) => {
  const result = await blogModel.findByIdAndUpdate(
    { _id: payload.id },
    { $set: payload.data },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, "not updated blog data");
  }
  return result;
};

const deleteBlogIntoDB = async (payload: any) => {
  const result = await blogModel.findByIdAndDelete(payload);
  if (!result) {
    throw new AppError(404, "not deleted blog data");
  }
  return result;
};

export const blogService = {
  createBlogIntoDB,
  getAllBlogIntoDB,
  getBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
