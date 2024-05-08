import { NextFunction, Request, Response } from "express";
import { UserCreateRequest } from "../models/user/createDataModel";
import { db } from "../config/db";

export async function existsCodeCheck(
    req: UserCreateRequest,
    res: Response,
    next: NextFunction
) {
    
    const result = await db.query(`/* SQL */ SELECT * FROM invite_codes WHERE code=$1`, [req.body.invite])

    if (!result.rowCount) {
        return res.status(401).json({
            status: 'error',
            errors: {
                invite: 'Код не существует!'
            }
        })
    } else return next()

}