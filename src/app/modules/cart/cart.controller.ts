import { cartService } from "@/app/modules/cart/cart.service.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";

const createCartData = catchAsync(async (req, res) => {
  const result = await cartService.createAddToCartDataIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "add your product in the cart.",
    success: true,
    data: result,
  });
});

const getCartData = catchAsync(async (req, res) => {});

const getCartsData = catchAsync(async (req, res) => {});

const deleteCartData = catchAsync(async (req, res) => {});

export const cartController = {
  createCartData,
  getCartData,
  getCartsData,
  deleteCartData,
};
