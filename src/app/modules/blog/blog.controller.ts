import { blogService } from "@/app/modules/blog/blog.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "blog created successfully",
    success: true,
    data: result,
  });
});

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
