import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import router from "@/app/routes/routes.main.js";
import config from "@/config/index.js";

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.get("/", (req, res) => {
  res.send("Home Page show now ccccc");
});
app.use("/api/v1", router);

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
