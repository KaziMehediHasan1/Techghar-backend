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

const getAllBlog = catchAsync(async (req, res) => {
  const { search, cursor } = req.query;
  const result = await blogService.getAllBlogIntoDB({ search, cursor });
  sendResponse(res, {
    statusCode: 200,
    message: "blog get successfully",
    success: true,
    data: result,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const result = await blogService.getBlogIntoDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: "blog get successfully",
    success: true,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogService.updateBlogIntoDB({
    id: req.params.id,
    data: req.body,
  });
  sendResponse(res, {
    statusCode: 200,
    message: "blog get successfully",
    success: true,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await blogService.deleteBlogIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "blog deleted successfully",
    success: true,
    data: result,
  });
});

export const blogController = {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
