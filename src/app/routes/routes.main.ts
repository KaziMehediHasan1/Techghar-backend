import expresss from "express";
import userRoute from "../modules/user/user.route.js";

const router = expresss.Router();

const moduleRouter = [
  {
    path: "/users",
    route: userRoute,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router
