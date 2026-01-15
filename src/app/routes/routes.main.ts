import profileRouter from "@/app/modules/profile/profile.route.js";
import promotionRoute from "@/app/modules/promotion/promotion.route.js";
import reviewRoute from "@/app/modules/review/review.route.js";
import userRoute from "@/app/modules/user/user.route.js";
import expresss from "express";


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
