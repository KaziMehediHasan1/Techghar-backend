import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { profileController } from "@/app/modules/profile/profile.controller.js";
import { zodProfileValidation } from "@/app/modules/profile/profile.validation.js";
import express from "express";


const router = express.Router();

router.post("/", validateRequest(zodProfileValidation),profileController.createProfileAddress);
router.get("/", validateAccessToken("admin"), profileController.getAllProfileAddress);
router.delete("/:id", profileController.deleteProfileAddress);
router.patch("/:id", profileController.updateProfileAddress);
router.get("/:id", profileController.getProfileAddress);

const profileRoute = router;
export default profileRoute;
