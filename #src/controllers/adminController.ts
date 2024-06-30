import { Request, Response } from "express";
import { dbQuery } from "../models/dbModel";
import { dbError } from "../models/errorModels";
import { generateChar } from "../utils/generateChar";
import { saltPassword } from "../utils/createSaltPass";
import { excelFromObject } from "../utils/excelFromObject";
import { ReqWithBody, ReqWithParams, ReqWithQuery } from "../baseTypes";
import { RequestWithTable } from "../models/excelFileModel";
import { isNotArray } from "../utils/isNoArray";
import { UserUpdateRequest } from "../models/org/userData";

export class Admin {
    async massReg(req: Request, res: Response) {
        const { table } = req as RequestWithTable;

        const [query, values] = insertUsersQuery(table);

        const [result] = await dbQuery(query, values);

        if (result === null) return dbError(res, "#4008");

        res.status(201).json({ users: result.rows });
    }

    async getList(
        req: Request &
            ReqWithQuery<{
                search?: string;
                order?: boolean;
                sort?: string;
                types?: string;
            }>,
        res: Response
    ) {
        let {
            search = "",
            order = "true",
            sort = "id",
            types = "[]",
        } = req.query;

        const fTypes = filtredTypes(types);

        order = order == "true";

        let serchClause = search
            ? `/* SQL */ 
                WHERE (name LIKE $1 OR
                surname LIKE $1 OR
                lastname LIKE $1 OR
                passport LIKE $1 OR
                phone LIKE $1 OR
                grade LIKE $1 OR
                mail LIKE $1 OR
                activity LIKE $1 OR
                country LIKE $1 OR
                city LIKE $1 OR
                name % $1 OR
                surname % $1 OR
                lastname % $1 OR
                passport % $1 OR
                phone % $1 OR
                grade % $1 OR
                mail % $1 OR
                activity % $1 OR
                country % $1 OR
                city % $1 OR
                (surname || ' ' || name || ' ' || lastname) % $1) ${
                    fTypes.length
                        ? `/* SQL */ AND type = ANY($2::text[])`
                        : `AND type != $2`
                }
                `
            : `/* SQL */ WHERE name != $1 ${
                  fTypes.length
                      ? `/* SQL */ AND type = ANY($2::text[])`
                      : "AND type != $2"
              }`;

        if (!accessSort.includes(sort)) sort = "id";

        const [result] = await dbQuery(
            `/* SQL */ 
            SELECT
            *
            FROM users
            ${serchClause}
            ORDER BY ${sort} ${!!order ? "ASC" : "DESC"}`,

            [search, fTypes]
        );

        if (result === null) return dbError(res, "#4007");

        res.json({ users: result.rows });
    }

    async update(req: UserUpdateRequest, res: Response) {
        const { id: userId } = req.params;

        const data = req.body;

        const [userRes] = await dbQuery(
            `/* SQL */ SELECT type, created, accreditation FROM users WHERE id=$1`,
            [userId]
        );

        if (userRes === null) return dbError(res, "#4010");

        const userData = userRes.rows[0];

        let fUserData = {};

        if (data["name"]) fUserData["name"] = data["name"];
        if (data["surname"]) fUserData["surname"] = data["surname"];
        if (data["lastname"]) fUserData["lastname"] = data["lastname"];
        if (data["grade"]) fUserData["grade"] = data["grade"];
        if (data["passport"]) fUserData["passport"] = data["passport"];
        if (data["activity"]) fUserData["activity"] = data["activity"];

        if (userData.type !== "partner") {

            if (
                data["accreditation"] &&
                data["accreditation"] == true &&
                (["smi", "speacker"].includes(userData.type) || ["smi", "speacker"].includes(data["type"]))
            ) fUserData["accreditation"] = data["accreditation"];

            if (data["organization"]) fUserData["organization"] = data["organization"];
            if (data["country"]) fUserData["country"] = data["country"];
            if (data["city"]) fUserData["city"] = data["city"];
            if (data["mail"]) fUserData["mail"] = data["mail"];
            if (data["phone"]) fUserData["phone"] = data["phone"];
            if (data["type"] && userData.created) fUserData["type"] = data["type"];
        }

        const updateKeys = Object.keys(fUserData);

        if (updateKeys.length === 0) return res.status(204).json({});

        const setClause = updateKeys
            .map((key, index) => `${key} = $${index + 3}`)
            .join(", ");

        const values = [
            new Date().getTime().toString(),
            userId,
            ...updateKeys.map((key) => data[key]),
        ];

        const queryText = `/* SQL */ UPDATE Users SET timestamp=$1, ${setClause} WHERE id=$2 RETURNING *`;

        const [result] = await dbQuery(queryText, values);
        if (result === null) return dbError(res, "#4010");

        res.json(result.rows[0]);
    }

    async delete(req: ReqWithParams<{ id: string }>, res: Response) {
        const { id } = req.params;

        const [result] = await dbQuery(
            `/* SQL */ DELETE FROM users WHERE id=$1`,
            [id]
        );
        if (result === null) return dbError(res, "#4004");
        res.status(204).json();
    }

    async partners(req: Request, res: Response) {
        const [result] = await dbQuery(
            `/* SQL */
            SELECT *
            FROM partners`,
            []
        );

        if (result === null) return dbError(res, "#4001");

        res.json({
            partners: result.rows,
        });
    }

    async partnersGen(req, res: Response) {
        const login = generateChar(20);
        const pass = generateChar(20);

        const { salt, sPass } = saltPassword(pass);

        const [accountInsert] = await dbQuery(
            `/* SQL */ INSERT INTO accounts (login, password, salt) VALUES ($1, $1, $3) RETURNING id`,
            [login, sPass, salt]
        );

        if (accountInsert === null) return dbError(res, "#4002");

        const [partnerInsert] = await dbQuery(
            `/* SQL */ INSERT INTO partners (account, timestamp) VALUES ($1, $1)`,
            [accountInsert.rows[0].id, new Date().getTime()]
        );

        if (partnerInsert === null) return dbError(res, "#4003");

        res.status(201).json({ login, password: pass });
    }

    async partnersDownload(req: Request, res: Response) {
        
        const [result] = await dbQuery(
            `/* SQL */
            SELECT *
            FROM partners`,
            []
        );

        if (result === null) return dbError(res, "#4002");

        const partnersData = result.rows.map((item) => {
            delete item.account;
            delete item.id;
            delete item.timestamp;

            item.logo = item.logo
                ? `https://brics.wpdataforum.ru/api/files/${item.reminder}`
                : null;
            item.contacts = item.contacts ?? "Не указаны";
            item.organization = item.organization ?? "Не указана";

            return item;
        });

        const [file, err] = excelFromObject(partnersData, {
            logo: "Логотип",
            description: "Описание",
            contacts: "Контакты",
            site: "Сайт",
            organization: "Организация",
        });

        if (file === null)
            return res.status(400).json({ errors: { excel: err } });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="partners.xlsx"`
        );

        await file.xlsx.write(res);
        res.end();
    }
}

const accessSort = ["id", "name", "surname", "lasname", "organization"];

function insertUsersQuery(array: any[]): [string, any[]] {
    const timestamp = new Date().getTime();

    const enhancedParticipants = array.map((participant) => ({
        ...participant,
        timestamp,
        type: typesDict[participant.type],
        created: true,
    }));

    const values = enhancedParticipants
        .map(
            (item, index) =>
                `($${index * 14 + 1}, $${index * 14 + 2}, $${index * 14 + 3}, 
                  $${index * 14 + 4}, $${index * 14 + 5}, $${
                    index * 14 + 6
                }, $${index * 14 + 7}, 
                  $${index * 14 + 8}, $${index * 14 + 9}, $${index * 14 + 10},
                  $${index * 14 + 11}, $${index * 14 + 12}, $${
                    index * 14 + 13
                }, $${index * 14 + 14})`
        )
        .join(", ");

    // Плоский массив всех значений для параметризованного запроса
    const queryParams = enhancedParticipants.flatMap(
        ({
            name,
            surname,
            lastname,
            passport,
            grade,
            activity,
            type,
            timestamp,
            organization,
            mail,
            phone,
            country,
            city,
            created,
        }) => [
            name,
            surname,
            lastname,
            passport,
            grade,
            activity,
            type,
            timestamp,
            organization,
            mail,
            phone,
            country,
            city,
            created,
        ]
    );

    // Создаем запрос
    const query = `/* SQL */ 
        INSERT INTO users 
        (name, surname, lastname, passport, grade, activity, type, timestamp, organization, mail, phone, country, city, created)
        VALUES ${values}
        RETURNING *
    `;

    return [query, queryParams];
}

const typesDict = {
    Участник: "attendees",
    VIP: "vip",
    Организатор: "org",
    Сми: "smi",
    Спикер: "speacker",
    "Тех. Персонал": "stuff",
    Партнер: "partner",
};

function filtredTypes(data: string): string[] {
    let types: string[] = JSON.parse(data);
    if (isNotArray(types)) types = [];

    const dict = Object.values(typesDict);

    return types.filter((item) => dict.includes(item));
}
