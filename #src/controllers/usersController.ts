import { Request, Response } from "express";
import { isNotArray } from "../utils/isNoArray";
import { getTableFromExcel } from "../utils/tableFromExcel";
import {
    RegAttendeesData,
    RegAttendeesRequest,
    RegTechniciansData,
    RegTechniciansRequest,
} from "../models/user/createDataModel";

import { db } from "../config/db";
import { dbError, errorSend } from "../models/errorModels";

export class User {
    async regFromExel(req: Request, res: Response) {
        if (!req.files || !req.files.file)
            return res.status(400).json({ error: "Нет файла" });

        const { file } = req.files;

        if (!isNotArray(file))
            return res
                .status(400)
                .json({ error: "Невозможна загрузка нескольких файлов" });

        const table = await getTableFromExcel(file);

        if (!table) return errorSend(res, { error: "excel reading error" });

        const validationResult = table.every(validationTechnicianData);

        if (!validationResult)
            return errorSend(res, { file: "Ошибка в обработки файла!" });

        const insertPromises = table.map(
            async (item) =>
                await insertTechnicians({
                    ...item,
                    ...{ timestamp: new Date().getTime() },
                })
        );

        await Promise.all(insertPromises)

        res.status(201).json({table});
    }

    async regAttendees(req: RegAttendeesRequest, res: Response) {
        const data = req.body;
        const timestamp = new Date().getTime();

        const [result, error] = await insertAttendees({
            ...data,
            ...{ timestamp },
        });

        if (error) return dbError(res, "#7003");

        res.json(result);
    }

    async regTechnicians(req: RegTechniciansRequest, res: Response) {
        const data = req.body;
        const timestamp = new Date().getTime();

        const [result, error] = await insertTechnicians({
            ...data,
            ...{ timestamp },
        });

        console.log(error);

        if (error) return dbError(res, "#7004");

        res.json(result);
    }
}

export async function insertAttendees(
    data: RegAttendeesData & { timestamp: number }
) {
    const client = await db.connect();
    const {
        name,
        surname,
        lastname = "",
        organization,
        grade,
        mail,
        phone,
        country,
        city,
        timestamp,
    } = data;

    try {
        await client.query("BEGIN");
        const insertResult = await client.query(
            `/* SQL */ 
            INSERT INTO attendees 
            (name, surname, lastname, organization, grade, mail, phone, country, city, code, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $10) 
            RETURNING *`,
            [
                name,
                surname,
                lastname,
                organization,
                grade,
                mail,
                phone.trim(),
                country,
                city,
                timestamp.toString(),
            ]
        );

        const user = insertResult.rows[0];

        await client.query(
            `/* SQL */ 
            UPDATE qrs
            SET used=true
            WHERE id=$1`,
            [user.code]
        );

        await client.query("COMMIT");
        return [user, null];
    } catch (e) {
        await client.query("ROLLBACK");
        return [null, e];
    } finally {
        client.release();
    }
}

export async function insertTechnicians(
    data: RegTechniciansData & { timestamp: number }
) {
    const client = await db.connect();
    const {
        name,
        surname,
        lastname = "",
        organization,
        grade,
        activity,
        passport,
        timestamp,
    } = data;

    try {
        await client.query("BEGIN");
        const insertResult = await client.query(
            `/* SQL */ 
            INSERT INTO technicians 
            (name, surname, lastname, organization, grade, activity, passport, code, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $8) 
            RETURNING *`,
            [
                name,
                surname,
                lastname,
                organization,
                grade,
                activity,
                passport,
                timestamp.toString(),
            ]
        );

        const user = insertResult.rows[0];

        await client.query(
            `/* SQL */ 
            UPDATE qrs
            SET used=true
            WHERE id=$1`,
            [user.code]
        );

        await client.query("COMMIT");
        return [user, null];
    } catch (e) {
        await client.query("ROLLBACK");
        return [null, e];
    } finally {
        client.release();
    }
}

function validationTechnicianData(item: RegTechniciansData) {
    const { name, surname, lastname, organization, grade, activity, passport } =
        item;

    if (!name || name.length < 2 || name.length > 30) return false;
    if (!surname || surname.length < 2 || surname.length > 30) return false;
    if (!!lastname && (lastname.length < 2 || lastname.length > 30))
        return false;
    if (!organization || organization.length < 2 || organization.length > 40)
        return false;
    if (!grade || grade.length < 2 || grade.length > 40) return false;
    if (!activity || activity.length < 2 || activity.length > 40) return false;
    if (!passport || passport.length < 6 || passport.length > 20) return false;

    return true;
}
