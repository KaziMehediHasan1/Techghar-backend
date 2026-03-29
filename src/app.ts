import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "@/app/routes/routes.main.js";
import config from "@/config/index.js";
import { setupCronJobs } from "@/utils/cron.js";
import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "@/utils/uploadthing.core.js";

const app: Application = express();
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(config.ai.apiKey as string);
// const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// console.log(models,"modell check up");
// // Middlewares
app.use(helmet());
setupCronJobs();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Home Page showing");
});
app.use("/api/v1", router);
app.use("/api/uploadthing", createRouteHandler({ router: ourFileRouter }));

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: config.env === "development" ? err.stack : null,
  });
});

export default app;
