import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { couponController } from "@/app/modules/coupon/coupon.controller.js";
import { zodCouponValidation } from "@/app/modules/coupon/coupon.validation.js";
import express from "express";

const route = express.Router();

route.post("/",validateAccessToken("admin"), validateRequest(zodCouponValidation),couponController.createCoupon);
route.get("/:id",validateAccessToken("admin","user"),couponController.getCoupon);
route.get("/",validateAccessToken("admin"),couponController.getAllCoupon);
route.patch("/:id",validateAccessToken("admin"),couponController.updateCoupon);
route.delete("/:id",validateAccessToken("admin"),couponController.deleteCoupon)

const couponRoute = route;
export default couponRoute;
