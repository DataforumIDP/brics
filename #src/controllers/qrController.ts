import { Request, Response } from "express";
import { generateChar } from "../utils/generateChar";
import { queryFromBd } from "../utils/queryBuilder";
import { dbError } from "../models/errorModels";


export class Qr {

    async uploadNewQRs(req: Request, res: Response) {
        const qrs = Array.from({ length: 100 }, () => generateChar(50))
        const result = await queryFromBd(`/* SQL */ INSERT INTO qrs (code) SELECT unnest($1::text[]) RETURNING *`, [qrs])

        if (!result) return dbError(res, "#1001")
        
        res.json(result.rows)
    }


}