import { NextFunction, Request, Response } from "express";

export function authError(res: Response) {
    return errorSend( res, { authorize: "Требуется авторизация!", }, { code: 401 } );
};

export function dbError(res: Response, slag: string = "#777!") {
    return errorSend( res, { db: `Ошибка базы данных ${slag}`, }, { code: 500 } );
}

export function errorSend(
    res: Response,
    data: any,
    options: { code: number } = { code: 400 }
) {
    return res.status(options.code).json({ errors: data });
}
