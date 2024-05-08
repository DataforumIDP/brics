import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { authError, dbError } from "../models/errorModels";
import { setUserData } from "../models/user/getUserDataModel";
import { queryFromBd } from "../utils/queryBuilder";

export const tokenAuthorizeCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1];
        if (token != '9e6e364004a5e5ce91c1fabe36a11630') return authError(res); 

        return next();
    }

    return authError(res);
};
