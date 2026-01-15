import express from "express";
import { profileController } from "./profile.controller.js";
import { validateAccessToken } from "../../middlewares/auth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { zodProfileValidation } from "./profile.validation.js";

const router = express.Router();

router.post("/", validateRequest(zodProfileValidation),profileController.createProfile);
router.get("/", validateAccessToken("admin"), profileController.getAllProfile);
router.delete("/:id", profileController.deleteProfile);
router.patch("/:id", profileController.updateProfile);
router.get("/:id", profileController.getProfile);

const profileRouter = router;
export default profileRouter;
