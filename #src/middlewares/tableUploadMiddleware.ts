import { Request, Response, NextFunction } from "express";
import { RequestWithTable } from "../models/excelFileModel";
import { getTableFromExcel } from "../utils/tableFromExcel";

export function tableUploadMiddleware(dict: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const file = (req as RequestWithTable).files?.file;
        const table = await getTableFromExcel(file, dict);

        if (!table) return res.status(400).json({ errors: {table: 'Не удалось распознать таблицу'} });

        (req as RequestWithTable).table = table;
        next();
    };
}