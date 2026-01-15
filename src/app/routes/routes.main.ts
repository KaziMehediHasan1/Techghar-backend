import expresss from "express";
import userRoute from "../modules/user/user.route.js";
import reviewRoute from "../modules/review/review.route.js";
import promotionRoute from "../modules/promotion/promotion.route.js";
import profileRouter from "../modules/profile/profile.route.js";

const router = expresss.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/review",
    route: reviewRoute,
  },
  {
    path: "/promotion",
    route: promotionRoute,
  },
  {
    path: "/profile",
    route: profileRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
