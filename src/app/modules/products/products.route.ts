import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { productController } from "@/app/modules/products/products.controller.js";
import { zodProductValidation } from "@/app/modules/products/products.validation.js";
import express from "express";

const router = express.Router();

router.post("/",validateRequest(zodProductValidation),productController.createProduct);
router.get("/",validateAccessToken("admin"),productController.getAllProduct);


const productRouter = router;
export default productRouter;
