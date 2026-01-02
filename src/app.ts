import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.get("/", (req, res) => {
  res.send("Home Page show now ccccc");
});

// app.use("/api/v1", routes)

// Global Error Handler
// app.use(globalErrorHandler);

export default app;
