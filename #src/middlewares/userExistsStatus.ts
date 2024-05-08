import { Response, NextFunction } from "express";
import { db } from "../config/db";
import { UserCreateRequest } from "../models/user/createDataModel";
import { formatedPhone } from "../utils/formatedPhone";
import { queryFromBd } from "../utils/queryBuilder";

/**
 * 
 * @param options - Объект парметров
 * @param exists - Параметр, отвечающий за то, должен ли существовать пользователь
 * @returns 
 */
export function userExistsStatus(options: { exists: boolean}) {
    return async function (
        req: UserCreateRequest,
        res: Response,
        next: NextFunction
    ) {

        // const { phone } = req.body

        // const result = await queryFromBd(res, `/* SQL */ SELECT id FROM users WHERE phone=$1`, [formatedPhone(phone)])

        // if (result === undefined) return

        // return !!result.rowCount == options.exists
        //     ? next()
        //     : res.status(400).json({
        //           status: "error",
        //           errors: {
        //               phone: options.exists
        //                 ? "Пользователь ещё не создан!"
        //                 : "Номер телефона занят!"
        //           },
        //       });
    };
}