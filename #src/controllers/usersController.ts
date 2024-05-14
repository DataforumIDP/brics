import { Request, Response } from "express";
import { isNotArray } from "../utils/isNoArray";
import { getTableFromExcel } from "../utils/tableFromExcel";
import {
    RegAttendeesData,
    RegAttendeesRequest,
} from "../models/user/createDataModel";
import { queryFromBd } from "../utils/queryBuilder";
import { insertAttendees } from "../utils/insertAttendeesTrans";

export class User {
    async regFromExel(req: Request, res: Response) {
        if (!req.files || !req.files.file)
            return res.status(400).json({ error: "Нет файлаfff" });

        const { file } = req.files;

        if (!isNotArray(file))
            return res
                .status(400)
                .json({ error: "Невозможна загрузка нескольких файлов" });

        const table = await getTableFromExcel(file);

        res.json({ table });
    }

    async regAttendees(req: RegAttendeesRequest, res: Response) {
        
        const data = req.body
        const timestamp = new Date().getTime()

        const [result, error] = await insertAttendees({
            ...data,
            ...{timestamp}
        })

        if (error) return res.json(error)
        
        res.json(result);
    }
}
