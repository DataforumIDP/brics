import { NextFunction, Request, Response } from "express";
import { ReqWithParams } from "../baseTypes";
import { dbQuery } from "../models/dbModel";
import { dbError } from "../models/errorModels";

export async function partnerUserExists(
    req: ReqWithParams<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    const partner = req.user?.id;
    const { id } = req.params;

    const [result] = await dbQuery(
        `/* SQL */ SELECT id FROM users WHERE partner_id=$1 AND id=$2`,
        [partner, id]
    );

    if (result === null) return dbError(res, "#0002");

    if (result.rowCount) return next();

    res.status(404).json({ errors: { user: "Участник не существует" } });
}
