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

const getCartData = catchAsync(async (req, res) => {
  const result = await cartService.getCartDataIntoDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: "cart items find succussfully",
    success: true,
    data: result,
  });
});

const getCartDatas = catchAsync(async (req, res) => {
  const result = await cartService.getCartDatasIntoDB();
  sendResponse(res, {
    statusCode: 200,
    message: "cart item find succussfully",
    success: true,
    data: result,
  });
});

const deleteCartData = catchAsync(async (req, res) => {
  const result = await cartService.deleteCartDataIntoDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "cart item find succussfully",
    success: true
  });
});

export const cartController = {
  createCartData,
  getCartData,
  getCartDatas,
  deleteCartData,
};
