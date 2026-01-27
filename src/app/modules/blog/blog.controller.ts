import catchAsync from "@/utils/catchAsync.js";

const createBlog = catchAsync(async (req, res) => {});

const getAllBlog = catchAsync(async (req, res) => {});

const getBlog = catchAsync(async (req, res) => {});

const updateBlog = catchAsync(async (req, res) => {});

const deleteBlog = catchAsync(async (req, res) => {});

export const blogController = {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
