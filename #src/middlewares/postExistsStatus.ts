import { Response, NextFunction } from "express";

import { queryFromBd } from "../utils/queryBuilder";
import { UpdatePostRequest } from "../models/post/updatePostData";
import { dbError } from "../models/errorModels";

/**
 * 
 * @param options - Объект парметров
 * @param exists - Параметр, отвечающий за то, должен ли существовать пользователь
 * @returns 
 */
export function postExistsStatus(options: { exists: boolean}) {
    return async function (
        req: UpdatePostRequest,
        res: Response,
        next: NextFunction
    ) {

        const { id } = req.params

        const result = await queryFromBd(`/* SQL */ SELECT id FROM posts WHERE id=$1`, [id])

        if (!result) return dbError(res, "#5002")

        return !!result.rowCount == options.exists
            ? next()
            : res.status(404).json({
                  status: "error",
                  errors: {
                      phone: options.exists
                        ? "Пост не найден!"
                        : "Пост уже существует!"
                  },
              });
    };
}