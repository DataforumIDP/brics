import { Request, Response } from "express";
import { ReqWithBody } from "../baseTypes";
import { dbQuery } from "../models/dbModel";
import {
    dbError,
    logInErrorSend,
} from "../models/errorModels";
import { saltPassword } from "../utils/createSaltPass";
import { createToken } from "../utils/createToken";
import { getUserData } from "../models/userDataModel";

export async function authorize(
    req: ReqWithBody<{ login: string; password: string }>,
    res: Response
) {
    const { login, password } = req.body;

    const [result] = await dbQuery(
        `/* SQL */ SELECT id, password, salt FROM accounts WHERE login=$1`,
        [login]
    );

    if (result === null) return dbError(res, "#0001");
    if (!result.rowCount) return logInErrorSend(res);

    const { id, salt, password: dbPassword } = result.rows[0];

    const { sPass: sPassword } = saltPassword(password, salt);
    if (sPassword != dbPassword) return logInErrorSend(res);

    let token = await createToken()

    const timestamp = new Date().getTime();

    const [insertRes] = await dbQuery(
        `/* SQL */ INSERT INTO tokens (token, account_id, timestamp) VALUES ($1, $2, $3) RETURNING token`,
        [token, id, timestamp]
    );

    if (insertRes === null) return dbError(res, '#0002')

    res.json({token});
}

export async function getTypeOfAccount(req: Request, res: Response){
    const type = req.user?.type
    res.json({type})
}