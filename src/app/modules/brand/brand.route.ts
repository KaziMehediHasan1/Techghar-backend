import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { brandController } from "@/app/modules/brand/brand.controller.js";
import { zodBrandValidation } from "@/app/modules/brand/brand.validation.js";
import express from "express";

const route = express.Router();

route.post("/", validateAccessToken("admin"), validateRequest(zodBrandValidation), brandController.createBrandData);
route.get("/",validateAccessToken("admin"), brandController.getAllBrandData);
route.get("/:id",validateAccessToken("admin"), brandController.getBrandData);
route.patch("/:id",validateAccessToken("admin"), brandController.updateBrandData);
route.delete("/:id",validateAccessToken("admin"), brandController.deleteBrandData)

const brandRoute = route;
export default brandRoute;
