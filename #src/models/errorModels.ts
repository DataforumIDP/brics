import { NextFunction, Request, Response } from "express";

export function authError(res: Response){
    return res.status(401).json({
        status: "error",
        errors: {
            authorize: "Требуется авторизация!",
        },
    });
}

export function dbError(res: Response, slag: string = '#777!'){
    return res.status(500).json({error: `Ошибка базы данных ${slag}`});
}