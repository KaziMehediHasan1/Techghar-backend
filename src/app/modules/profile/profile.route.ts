import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { profileController } from "@/app/modules/profile/profile.controller.js";
import { zodProfileValidation } from "@/app/modules/profile/profile.validation.js";
import express from "express";


const router = express.Router();

router.post("/", validateRequest(zodProfileValidation),profileController.createProfile);
router.get("/", validateAccessToken("admin"), profileController.getAllProfile);
router.delete("/:id", profileController.deleteProfile);
router.patch("/:id", profileController.updateProfile);
router.get("/:id", profileController.getProfile);

const profileRouter = router;
export default profileRouter;
