import config from "@/src/config/index.js";
import type { TAuth, TRole } from "@/src/types/auth.type.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse.js";

export const generateAccessToken = (payload: TAuth) => {
  return jwt.sign(payload, config.jwt.secret as string, { expiresIn: "24h" });
};

export const validateAccessToken = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

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

      const role = decoded.role as TRole;

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
