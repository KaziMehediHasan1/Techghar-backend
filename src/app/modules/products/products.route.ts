import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { productController } from "@/app/modules/products/products.controller.js";
import { zodProductValidation } from "@/app/modules/products/products.validation.js";
import { generateProductFromImage } from "@/services/index.demo.js";
import express from "express";

const route = express.Router();

route.post("/", validateRequest(zodProductValidation),validateAccessToken("admin"), productController.createProduct);
route.get("/", validateAccessToken("admin"), productController.getAllProduct);
route.get("/:id", validateAccessToken("user","admin"), productController.getProduct);
route.patch("/:id",validateAccessToken("user","admin"), productController.updateProduct)
route.delete("/:id",validateAccessToken("user","admin"), productController.deleteProduct)
route.post("/ai",generateProductFromImage)
const productRoute = route;
export default productRoute;
