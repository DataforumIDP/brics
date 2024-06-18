import { NextFunction, Request, Response } from "express";
import { ReqWithParams } from "../baseTypes";
import { dbQuery } from "../models/dbModel";
import { dbError } from "../models/errorModels";

export async function userExists(
    req: ReqWithParams<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    
    const { id } = req.params;

    const [result] = await dbQuery(
        `/* SQL */ SELECT id FROM users WHERE id=$1`,
        [id]
    );

    if (result === null) return dbError(res, "#0003");

    if (result.rowCount) return next();

    res.status(404).json({ errors: { user: "Участник не существует" } });
}
