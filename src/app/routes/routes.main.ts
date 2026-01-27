import blogRoute from "@/app/modules/blog/blog.route.js";
import brandRoute from "@/app/modules/brand/brand.route.js";
import addToCartRoute from "@/app/modules/cart/cart.route.js";
import contactRoute from "@/app/modules/contact/contact.route.js";
import couponRoute from "@/app/modules/coupon/coupon.route.js";
import orderRoute from "@/app/modules/order/order.route.js";
import productRoute from "@/app/modules/products/products.route.js";
import profileRoute from "@/app/modules/profile/profile.route.js";
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
    route: profileRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/coupon",
    route: couponRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/addToCart",
    route: addToCartRoute,
  },
  {
    path: "/brand",
    route: brandRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
