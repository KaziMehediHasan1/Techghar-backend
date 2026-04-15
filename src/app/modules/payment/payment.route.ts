import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { paymentController } from "@/app/modules/payment/payment.controller.js";
import { zododPaymentValidation } from "@/app/modules/payment/payment.validation.js";
import express from "express";

const route = express.Router();

route.post("/create-payment-intent", paymentController.createPaymentIntent),
route.post("/",validateAccessToken("user","admin"),validateRequest(zododPaymentValidation),paymentController.createPayment),
route.get("/",validateAccessToken("admin","user"), paymentController.getAllPaymentsData),
route.get("/:id",validateAccessToken("admin","user"),paymentController.getPaymentData),
route.patch("/:id",validateAccessToken("admin"),paymentController.updatePaymentData)
route.delete("/:id",validateAccessToken("admin"), paymentController.deletePaymentData)

const paymentRoute = route;
export default paymentRoute