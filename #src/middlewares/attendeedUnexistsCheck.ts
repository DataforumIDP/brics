import { NextFunction, Request, Response } from "express";

import { errorSend } from "../models/errorModels";
import { dbQuery } from "../models/dbModel";

export async function attendeedUnexistsCheck(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { mail } = req.body;

    const [result] = await dbQuery(
        `/* SQL */ SELECT id FROM attendees WHERE mail=$1`,
        [mail]
    );

    if (result?.rowCount)
        return errorSend(res, {
            mail: {
                ru: "Почта уже занята!",
                en: "The mail is already occupied!",
            },
        });

    next();
}
