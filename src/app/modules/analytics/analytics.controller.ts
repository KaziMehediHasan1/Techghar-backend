import { blogService } from "@/app/modules/blog/blog.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createAnalytics = catchAsync(async (req, res) => {
  const result = await blogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "add Analytics data successfully",
    success: true,
    data: result,
  });
});

const getAnalytics = catchAsync(async (req, res) => {
  const result = await blogService.getBlogIntoDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: "get analytics data successfully",
    success: true,
    data: result,
  });
});

const deleteAnalytics = catchAsync(async (req, res) => {
  const result = await blogService.deleteBlogIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "deleted analytics data successfully",
    success: true,
    data: result,
  });
});

export const analyticsController = {
  createAnalytics,
  getAnalytics,
  deleteAnalytics,
};
