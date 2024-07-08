import { Request, Response } from "express";

import {
    RegAttendeesRequest,
} from "../models/attendees/createDataModel";


import { dbError } from "../models/errorModels";

import { dbQuery } from "../models/dbModel";
import { sendMail } from "../utils/sendMail";
import { mailRegText } from "../models/mailRegText";

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
                mail.toLowerCase(),
                phone.trim(),
                country,
                city,
                timestamp.toString(),
                type,
            ]
        );

        if (result === null) return dbError(res, "#2001");

        if (type == "attendees") {
            await sendMail(
                mail,
                "Регистрация на Форум будущего БРИКС. Облачные города",
                mailRegText
            );
        }

        const user = result.rows[0];

        res.json({ user });
    }
}

