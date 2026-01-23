import { ZodObject } from "zod";
import type { NextFunction, Request, Response } from "express";
import sendResponse from "@/utils/sendResponse.js";


export const validateRequest = (schema:ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!validationResult.success) {
      return sendResponse(res,{
        success: false,
        statusCode: 400,
        message: "Validation Error",
        data: validationResult.error.issues,
      })
    }
    next();
  };
};
