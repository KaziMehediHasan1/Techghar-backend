import { orderService } from "@/app/modules/order/order.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";
import { SUCCESS_MESSAGES } from "@/constants/successMessages.js";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: SUCCESS_MESSAGES.product.created.statusCode,
    message: SUCCESS_MESSAGES.product.created.message,
    success: true,
    data: result,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await orderService.getOrderIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    message: "Order fetche successfull",
    success: true,
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrderIntoDB();
  sendResponse(res, {
    statusCode: 200,
    message: "Orders fetche successfull",
    success: true,
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const data = req.body;
  const result = await orderService.updateOrderIntoDB({ id, data });
  sendResponse(res, {
    statusCode: 200,
    message: `order updated successfully`,
    success: true,
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  await orderService.deleteOrderIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    message: `order deleted successfully`,
    success: true,
  });
});

export const orderController = {
  createOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
};
