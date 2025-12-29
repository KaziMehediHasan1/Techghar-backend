import type { Response, Request, NextFunction } from "express";
export interface IRouterHandler<T = any> {
  (req: Request, res: Response, next: NextFunction): T | Promise<T>;
}
