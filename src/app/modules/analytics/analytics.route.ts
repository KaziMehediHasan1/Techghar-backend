import { analyticsController } from "@/app/modules/analytics/analytics.controller.js";
import express from "express";
const route = express.Router();

route.post("/", analyticsController.createAnalytics);
route.get("/", analyticsController.getAnalytics);
route.delete("/", analyticsController.deleteAnalytics); // optional becuase admin can see before 1years data

const analyticsRoute = route;
export default analyticsRoute;
