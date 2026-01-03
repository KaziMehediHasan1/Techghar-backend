import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./app/routes/routes.main.js";

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
app.use(express.urlencoded({ extended: true }));

// Application routes
app.get("/", (req, res) => {
  res.send("Home Page show now ccccc");
});
app.use("/api/v1", router);


// Global Error Handler
// app.use(globalErrorHandler);

export default app;
