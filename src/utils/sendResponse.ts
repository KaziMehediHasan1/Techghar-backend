import type { Response } from "express";
import type { TResponse } from "@/types/sendResponse.type.js";

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    // meta: {
    //   page: (data.data as any)?.meta?.page || 1,
    //   limit: (data.data as any)?.meta?.limit || 10,
    //   total: (data.data as any)?.meta?.total || 0,
    //   totalPage: (data.data as any)?.meta?.totalPage || 0,
    // },
  });
};

export default sendResponse;
