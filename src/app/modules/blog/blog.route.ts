import { validateAccessToken } from "@/app/middlewares/auth.js";
import { validateRequest } from "@/app/middlewares/validateRequest.js";
import { blogController } from "@/app/modules/blog/blog.controller.js";
import { zodBlogValidation } from "@/app/modules/blog/blog.validation.js";
import express from "express";

const route = express.Router();

route.post("/",validateAccessToken("admin"), validateRequest(zodBlogValidation), blogController.createBlog);
route.get("/", blogController.getAllBlog);
route.get("/:id", blogController.getBlog);
route.patch("/:id",validateAccessToken("admin"), blogController.updateBlog);
route.delete("/:id",validateAccessToken("admin"), blogController.deleteBlog)

const blogRoute = route;
export default blogRoute;
