import config from "@/config/index.js";
import { type Response } from "express";
export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env === "development", // it will change when uses production
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 DAYS
  });
};
