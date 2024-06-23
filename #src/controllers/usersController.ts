import { Request, Response } from "express";
import { isNotArray } from "../utils/isNoArray";
// import { getTableFromExcel } from "../utils/tableFromExcel";
import {
    RegAttendeesData,
    RegAttendeesRequest,
} from "../models/attendees/createDataModel";

import { db } from "../config/db";
import { dbError, errorSend } from "../models/errorModels";
import { UserData, getUserData } from "../models/userDataModel";
import { dbQuery } from "../models/dbModel";

export class User {

    async reg(req: RegAttendeesRequest, res: Response) {
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
            type,
        } = req.body;

        const timestamp = new Date().getTime();

        const [result] = await dbQuery(
            `/* SQL */ 
            INSERT INTO users 
            (name, surname, lastname, organization, grade, mail, phone, country, city, timestamp, type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
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
                type
            ]
        );

        if (result === null) return dbError(res, "#2001");

        const user = result.rows[0];

        res.json({ user });
    }

    
}

// export async function insertAttendees(
//     data: RegAttendeesData & { timestamp: number }
// ) {
//     const client = await db.connect();
//     const {
//         name,
//         surname,
//         lastname = "",
//         organization,
//         grade,
//         mail,
//         phone,
//         country,
//         city,
//         timestamp,
//     } = data;

//     try {
//         await client.query("BEGIN");
//         const insertResult = await client.query(
//             `/* SQL */
//             INSERT INTO attendees
//             (name, surname, lastname, organization, grade, mail, phone, country, city, code, timestamp)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $10, 11)
//             RETURNING *`,
//             [
//                 name,
//                 surname,
//                 lastname,
//                 organization,
//                 grade,
//                 mail,
//                 phone.trim(),
//                 country,
//                 city,
//                 timestamp.toString(),
//                 passport,
//             ]
//         );

//         const user = insertResult.rows[0];

//         await client.query(
//             `/* SQL */
//             UPDATE qrs
//             SET used=true
//             WHERE id=$1`,
//             [user.code]
//         );

//         await client.query("COMMIT");
//         return [user, null];
//     } catch (e) {
//         await client.query("ROLLBACK");
//         return [null, e];
//     } finally {
//         client.release();
//     }
// }

// export async function insertTechnicians(
//     data: RegTechniciansData & { timestamp: number }
// ) {
//     const client = await db.connect();
//     const {
//         name,
//         surname,
//         lastname = "",
//         organization,
//         grade,
//         activity,
//         passport,
//         timestamp,
//     } = data;

//     try {
//         await client.query("BEGIN");
//         const insertResult = await client.query(
//             `/* SQL */
//             INSERT INTO technicians
//             (name, surname, lastname, organization, grade, activity, passport, code, timestamp)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $8)
//             RETURNING *`,
//             [
//                 name,
//                 surname,
//                 lastname,
//                 organization,
//                 grade,
//                 activity,
//                 passport,
//                 timestamp.toString(),
//             ]
//         );

//         const user = insertResult.rows[0];

//         await client.query(
//             `/* SQL */
//             UPDATE qrs
//             SET used=true
//             WHERE id=$1`,
//             [user.code]
//         );

//         await client.query("COMMIT");
//         return [user, null];
//     } catch (e) {
//         await client.query("ROLLBACK");
//         return [null, e];
//     } finally {
//         client.release();
//     }
// }

// function validationTechnicianData(item: RegTechniciansData) {
//     const { name, surname, lastname, organization, grade, activity, passport } =
//         item;

//     if (!name || name.length < 2 || name.length > 30) return false;
//     if (!surname || surname.length < 2 || surname.length > 30) return false;
//     if (!!lastname && (lastname.length < 2 || lastname.length > 30))
//         return false;
//     if (!organization || organization.length < 2 || organization.length > 40)
//         return false;
//     if (!grade || grade.length < 2 || grade.length > 40) return false;
//     if (!activity || activity.length < 2 || activity.length > 40) return false;
//     if (!passport || passport.length < 6 || passport.length > 20) return false;

//     return true;
// }
