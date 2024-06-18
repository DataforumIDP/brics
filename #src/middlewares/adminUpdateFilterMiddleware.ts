import { NextFunction, Response } from "express";
import { UserUpdateRequest } from "../models/org/userData";

export function adminUpdateFilterMiddleware(
    req: UserUpdateRequest,
    res: Response,
    next: NextFunction
) {
    const data = req.body;
    const updateKeys = Object.keys(data).filter(
        (key) => allowedUpdates.includes(key) && data[key] != ""
    );
    
    let result = {}
    updateKeys.map(item=> (result[item] = data[item]))
    req.body = result
    next()
}

const allowedUpdates = [
    "name",
    "surname",
    "lastname",
    "passport",
    "phone",
    "grade",
    "mail",
    "activity",
    "country",
    "city",
    "type",
    "accreditation",
    "city",
];
