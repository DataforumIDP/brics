import { Request, Response, NextFunction } from "express";
import { CreatePartnerData } from "../models/partners/createDataModel";
import { RequestWithTable } from "../models/excelFileModel";

const tableValidation = (
    array: any[]
): [false, string, number] | [true, null, null] => {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];

        const { name, surname } = item;

        if (name.length < 2 || name.length >= 30) {
            return [false, "Имя должно быть длиннее 3 и короче 30 символов", i];
        }

        if (surname.length < 2 || surname.length >= 30) {
            return [false, "Фамилия должна быть длиннее 3 и короче 30 символов", i];
        }
    }

    return [true, null, null];
};

export function adminTableMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const [valResult, mess, ind] = tableValidation(
        (req as RequestWithTable).table as CreatePartnerData[]
    );

    if (valResult) return next();

    res.status(400).json({
        errors: {
            table: {
                row: ind+2,
                text: mess,
            },
        },
    });
}
