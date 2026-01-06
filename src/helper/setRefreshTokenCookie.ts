import { type Response } from "express";
import config from "../config/index.js";
export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: config.env === "development", // it will change when uses production
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 DAYS
  });
};
