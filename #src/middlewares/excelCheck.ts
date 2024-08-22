import { NextFunction, Request, Response } from "express";
import { isNotArray } from "../utils/isNoArray";

export function excelCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.file)
        return res.status(400).json({
            errors: {
                file: {
                    ru: "Необходимо загрузить файл!",
                    en: "The file needs to be uploaded!",
                },
            },
        });

    const { file } = req.files;

    if (!isNotArray(file))
        return res.status(400).json({
            errors: {
                file: {
                    ru: "Невозможна загрузка нескольких файлов",
                    en: "It is not possible to download multiple files",
                },
            },
        });

    if (file.name.split(".").at(-1) != "xlsx")
        return res.status(400).json({
            errors: {
                file: {
                    ru: "Некорректный формат файла",
                    en: "Incorrect file format",
                },
            },
        });

    next();
}
