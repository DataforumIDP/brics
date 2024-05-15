import { NextFunction, Request, Response } from "express";

import { errorSend } from "../models/errorModels";
import { queryFromBd } from "../utils/queryBuilder";

export async function techniciansUnexistsCheck(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { passport } = req.body;

    const result = await queryFromBd(
        `/* SQL */ SELECT id FROM technicians WHERE passport=$1`,
        [passport]
    );

    if (result?.rowCount)
        
        return errorSend(res, {
            passport: {
                ru: "Пользователь уже зарегистрирован!",
                en: "The user is already registered!",
            },
        });

    next();
}
