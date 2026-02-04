import jwt, { type SignOptions } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { TAuth, TRole } from "@/types/auth.type.js";
import config from "@/config/index.js";
import catchAsync from "@/utils/catchAsync.js";
import sendResponse from "@/utils/sendResponse.js";
import type { IJwtUser } from "@/app/modules/user/user.interface.js";

// GENERATE ACCESS TOKEN FOR 15MINS ONLY
export const generateAccessToken = (payload: TAuth) => {
  return jwt.sign(payload, config.jwt.secret as any, {
    expiresIn: config.jwt.expires_in as any,
    algorithm: "HS256",
  });
};

// GENERATE REFRESS TOKEN FOR 30-DAYS
export const generateRefreshToken = (payload: TAuth) => {
  const option: SignOptions = {
    expiresIn: config.jwt.refresh_expires_in as any,
    algorithm: "HS256",
  };
  return jwt.sign(payload, config.jwt.refresh_secret as any, option);
};

// ROLE BASED VALIDATE USER AND GIVE ACTUAL DATA WHAT THEY CAN TRY TO GOT
export const validateAccessToken = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access",
      });
    }

    const token = authHeader?.split(" ")[1];
    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access",
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.secret as string
      ) as IJwtUser;

      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden access",
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Invalid or expired token",
      });
    }
  });
};
