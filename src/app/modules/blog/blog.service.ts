import blogModel from "@/app/modules/blog/blog.model.js";
import AppError from "@/utils/appError.js";
import mongoose from "mongoose";

const createBlogIntoDB = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

const getAllBlogIntoDB = async (payload: any) => {
  const { search, cursor } = payload;
  let query: any[] = [];

  if (search) {
    query.push({
      $search: {
        index: "default",
        text: {
          query: search,
          path: ["title", "description", "category"],
          fuzzy: { maxEdits: 1 },
        },
      },
    });
  } else {
    query.push({
      $sort: { createAt: -1 },
    });
  }

  if (cursor) {
    query.push({
      $match: { _id: { $lt: new mongoose.Types.ObjectId(cursor) } },
    });
  }

  query.push({
    $project: {
      embedding: 0,
      embedding_text: 0,
      __v: 0,
    },
  });

  query.push({ $limit: 10 });

  const totalData = await blogModel.countDocuments(query);

  const result = await blogModel.aggregate(query);
  if (!result || result.length === 0) {
    throw new AppError(404, "No blogs found");
  }
  return {
    result,
    total: totalData,
    nextCursor: result.length === 10 ? result[result.length - 1]._id : null,
  };
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
