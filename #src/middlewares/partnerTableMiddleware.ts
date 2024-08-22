import { Request, Response, NextFunction } from "express";
import { CreatePartnerData } from "../models/partners/createDataModel";
import { RequestWithTable } from "../models/excelFileModel";

const tableValidation = (
    array: CreatePartnerData[]
): [false, string, number] | [true, null, null] => {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];

        const { name, surname, lastname, passport, grade, activity } = item;

        if (!name || (name.length <= 3 || name.length >= 30)) {
            return [false, "Имя должно быть длиннее 3 и короче 30 символов", i];
        }

        if (!surname || (surname.length <= 3 || surname.length >= 30)) {
            return [false, "Фамилия должна быть длиннее 3 и короче 30 символов", i];
        }

        if (lastname && (lastname.length <= 3 || lastname.length >= 30)) {
            return [false, "Отчество должно быть длиннее 3 и короче 30 символов", i];
        }

        if (!passport || (passport.length <= 4 || passport.length >= 30)) {
            return [false, "Длина паспорта должна быть длиннее 4 и короче 30 символов", i];
        }

        if (!grade || (grade.length <= 3 || grade.length >= 60)) {
            return [false, "Длина должности должно быть длиннее 3 и короче 60 символов", i];
        }

        // Добавьте другие проверки по мере необходимости
    }

    return [true, null, null];
};

export function partnerTableMiddleware(
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
