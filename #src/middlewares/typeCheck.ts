import { NextFunction, Request, Response } from "express";
import { authError } from "../models/errorModels";
import { UserData } from "../models/userDataModel";

export function typeCheck(type: 'partner' | 'org') {
    return (req: Request, res: Response, next: NextFunction) => {

        if (isUserDefined(req) && req.user.type == type) {

            (req as Request & { user: UserData }).user = req.user
            return next()
        }
        authError(res)
    };
}

function isUserDefined(req: Request): req is Request & { user: UserData } {
    return req.user !== undefined;
}