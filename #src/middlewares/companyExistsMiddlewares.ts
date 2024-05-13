import { NextFunction, Request, Response } from "express";
import { info } from "../utils/getCompanyInfo";
import { errorSend } from "../models/errorModels";

export async function companyExistsMiddlewares(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const organization = (await info(req.body.organization))?.value;
    if (!organization)
        return errorSend(res, {
            organization: {
                ru: "Некорректная организация",
                en: "",
            },
        });
    
    req.body.organization = organization
    next()
}
