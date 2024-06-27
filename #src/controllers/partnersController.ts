import { Request, Response } from "express";
import { dbQuery } from "../models/dbModel";
import { dbError, errorSend } from "../models/errorModels";
import { ReqWithParams, ReqWithQuery } from "../baseTypes";
import { UserData } from "../models/userDataModel";
import { UpdatePartnerRequest } from "../models/partners/updateDataModel";
import { RequestWithTable } from "../models/excelFileModel";
import { getTableFromExcel } from "../utils/tableFromExcel";
import { CreatePartnerData } from "../models/partners/createDataModel";

export class Partner {
    async reg(req: Request, res: Response) {
        const {
            name,
            surname,
            lastname = "",
            grade,
            passport,
            activity,
        } = req.body;

        const { id } = req.user as UserData;

        const timestamp = new Date().getTime();

        let [result] = await dbQuery(
            `/* SQL */ 
            SELECT organization FROM partners WHERE account=$1`,
            [id]
        );

        if (result === null) return dbError(res, "#3001");

        const organization = result.rows[0].organization ?? "none";

        [result] = await dbQuery(
            `/* SQL */ 
            INSERT INTO users 
            (name, surname, lastname, grade, timestamp, partner_id, organization, passport, activity, type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`,
            [
                name,
                surname,
                lastname,
                grade,
                timestamp.toString(),
                id,
                organization,
                passport,
                activity,
                "partner",
            ]
        );

        if (result === null) return dbError(res, "#3002");

        const user = result.rows[0];

        res.json({ user });
    }

    async massReg(req: Request, res: Response) {
        
        const {table} = req as RequestWithTable

        const { id } = req.user as UserData;

        if (!table.length) return res.status(204).json()

        let [result] = await dbQuery(
            `/* SQL */ 
            SELECT organization FROM partners WHERE account=$1`,
            [id]
        );

        if (result === null) return dbError(res, "#3009");

        const organization = result.rows[0].organization ?? "none";

        const [query, values] = insertPartnersQuery(table, id, organization)

        // res.json({query, values})
        const [insertResult] = await dbQuery(query, values)

        if (insertResult === null) return dbError(res, '#3010')

        res.status(201).json({users: insertResult.rows})
    }

    async list(
        req: Request &
            ReqWithQuery<{ search?: string; order?: boolean; sort?: string }>,
        res: Response
    ) {
        const { id } = req.user as UserData;

        let { search, order = "true", sort = "id" } = req.query;
        
        console.log(`Order-text: ${order}`, order);
        order = order == "true";

        console.log(`Order-val: ${!!order ? "ASC" : "DESC"}`);
        

        let serchClause = search
            ? `/* SQL */ 
                (name LIKE $2 OR
                surname LIKE $2 OR
                lastname LIKE $2 OR
                passport LIKE $2 OR
                phone LIKE $2 OR
                grade LIKE $2 OR
                mail LIKE $2 OR
                activity LIKE $2 OR
                country LIKE $2 OR
                city LIKE $2 OR
                name % $2 OR
                surname % $2 OR
                lastname % $2 OR
                passport % $2 OR
                phone % $2 OR
                grade % $2 OR
                mail % $2 OR
                activity % $2 OR
                country % $2 OR
                city % $2 OR
                (surname || ' ' || name || ' ' || lastname) % $2)
                AND
                `
            : ``;

        if (!accessSort.includes(sort)) sort = "id";

        const [result] = await dbQuery(
            `/* SQL */ 
            SELECT
            id,
            name,
            surname,
            lastname,
            grade,
            country,
            city,
            passport,
            mail,
            organization,
            activity,
            phone
            FROM users
            WHERE ${serchClause} partner_id = $1
            ORDER BY ${sort}, id ${!!order ? "ASC" : "DESC"}`,
            search ? [id, search] : [id]
        );

        if (result === null) return dbError(res, "#3003");

        res.json({ users: result.rows });
    }

    async update(req: UpdatePartnerRequest, res: Response) {
        const { id: userId } = req.params;
        const data = req.body;
        const { id } = req.user as UserData;

        const updateKeys = Object.keys(data).filter(
            (key) => allowedUpdates.includes(key) && data[key] != ""
        );

        // ToDo | сделать ответ, если не требуется обновление
        if (updateKeys.length === 0) {
            return res.status(200).json({});
        }

        const setClause = updateKeys
            .map((key, index) => `${key} = $${index + 4}`)
            .join(", ");

        const values = [
            new Date().getTime().toString(),
            userId,
            id,
            ...updateKeys.map((key) => data[key]),
        ];

        const queryText = `/* SQL */ UPDATE users SET timestamp = $1, ${setClause} WHERE id = $2 AND partner_id=$3 RETURNING *`;

        const [result] = await dbQuery(queryText, values);

        if (result === null) return dbError(res, "#3009");

        res.json({ user: result.rows[0] });
    }

    async delete(req: ReqWithParams<{ id: string }>, res: Response) {
        const { id } = req.params;
        const [result] = await dbQuery(
            `/* SQL */ DELETE FROM users WHERE id=$1`,
            [id]
        );
        if (result === null) return dbError(res, "#3005");
        res.status(204).json();
    }

    async info(req: Request, res: Response) {
        const { id } = req.user as UserData;

        const [result] = await dbQuery(
            `/* SQL */ SELECT * FROM partners WHERE account=$1`,
            [id]
        );

        if (result === null) return dbError(res, "#3006");

        res.json({ partner: result.rows[0] });
    }
    async updateInfo(req: Request, res: Response) {
        const data = req.body;
        const { id } = req.user as UserData;

        const updateKeys = Object.keys(data).filter(
            (key) => allowedUpdatesInfo.includes(key) && (data[key] != "" || data[key] === null)
        );
        

        // ToDo | сделать ответ, если не требуется обновление
        if (updateKeys.length === 0) {
            return res.status(200).json({});
        }

        const setClause = updateKeys
            .map((key, index) => `${key} = $${index + 3}`)
            .join(", ");

        const values = [
            new Date().getTime().toString(),
            id,
            ...updateKeys.map((key) => data[key]),
        ];

        const queryText = `/* SQL */ UPDATE partners SET timestamp=$1, ${setClause} WHERE account = $2 RETURNING *`;

        const [result] = await dbQuery(queryText, values);

        if (result === null) return dbError(res, "#3007");

        if (data.organization) {
            const [users] = await dbQuery(
                `/* SQL */ UPDATE users SET organization=$1, timestamp=$2 WHERE partner_id=$3`,
                [data.organization, new Date().getTime().toString(), id]
            );

            if (users === null) return dbError(res, "#3008");
        }

        res.json({ partner: result.rows[0] });
    }
}

const accessSort = ["id", "name", "surname", "lasname", "organization"];

const allowedUpdatesInfo = [
    "reminder",
    "description",
    "contacts",
    "site",
    "organization",
];

const allowedUpdates = [
    "grade",
    "name",
    "surname",
    "lastname",
    "passport",
    "activity",
];


function insertPartnersQuery(array: CreatePartnerData[], partner: string, organization: string): [string, any[]] {

    const enhancedParticipants = array.map(participant => ({
        ...participant,
        type: 'partner',
        timestamp: new Date().getTime(),
        partner,
        organization
    }));

    const values = enhancedParticipants.map(
        (item, index) => `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${index * 10 + 4}, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${index * 10 + 8}, $${index * 10 + 9}, $${index * 10 + 10})`
    ).join(', ');

    // Плоский массив всех значений для параметризованного запроса
    const queryParams = enhancedParticipants.flatMap(({ name, surname, lastname, passport, grade, activity, type, timestamp, partner, organization }) => [name, surname, lastname, passport, grade, activity, type, timestamp, partner, organization]);

    // Создаем запрос
    const query = `/* SQL */ 
        INSERT INTO users (name, surname, lastname, passport, grade, activity, type, timestamp, partner_id, organization)
        VALUES ${values}
        RETURNING *
    `;

    return [query, queryParams]
}