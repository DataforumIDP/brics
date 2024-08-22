import { FieldValidationError, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const inputValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        let errs = {}

        errors.array().map(item => {

            const {msg, path} = item as FieldValidationError
            errs[path] = msg
        })


        res.status(400).json({
            status: 'error',
            errors: errs
        })
    } else {
        next()
    }
};