import config from "@/config/index.js";
import { type Response } from "express";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env === "production", 
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "none",
  });
};
