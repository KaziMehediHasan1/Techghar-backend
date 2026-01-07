import config from "@/src/config/index.js";
import type { TAuth, TRole } from "@/src/types/auth.type.js";
import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse.js";

// GENERATE ACCESS TOKEN FOR 15MINS ONLY
export const generateAccessToken = (payload: TAuth) => {
  return jwt.sign(payload, config.jwt.secret as string, {
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
  return jwt.sign(payload, config.jwt.refresh_secret as string, option);
};

// ROLE BASED VALIDATE USER AND GIVE ACTUAL DATA WHAT THEY CAN TRY TO GOT
export const validateAccessToken = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]
    // console.log(token,"token")

    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "You are not authorized!",
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.secret as string
      ) as JwtPayload;
      // console.log(decoded,"check decoded data")

      const role = decoded.role as TRole;
      // console.log(role,"checke role, if is actually added in decoded obj")

      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        return sendResponse(res, {
          success: false,
          statusCode: 403,
          message: "You do not have permission to access this route",
        });
      }

      req.user = role;
      next();
    } catch (err) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "Unauthorized access (Invalid Token)",
      });
    }
  });
};

