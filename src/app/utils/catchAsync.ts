import type { Request, Response, NextFunction } from "express";
import type { IRouterHandler } from "../../types/routerhandler.interface.js";

const catchAsync = (func: IRouterHandler<IRouterHandler>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch(err => next(err));
    };
};

export default catchAsync;
