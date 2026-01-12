import expresss from "express";
import userRoute from "../modules/user/user.route.js";
import reviewRoute from "../modules/review/review.route.js";

const router = expresss.Router();

const moduleRouter = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/review",
    route: reviewRoute,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
