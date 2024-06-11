import { NextFunction, Request, Response } from "express";
import { info } from "../utils/getCompanyInfo";
import { errorSend } from "../models/errorModels";

export function companyExistsMiddlewares({optional} = {optional: false}) {

    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const [organization, err] = await info(req.body.organization);
        
    
        if (err || (!organization && !optional)) {
            return errorSend(res, {
                organization: {
                    ru:
                        err?.response?.status == 504
                            ? "Лимит запросов привышен, обратитесь в поддержку!"
                            : "Некорректная организация!",
                    en:
                        err?.response?.status == 504
                            ? "The request limit has been exceeded, contact support!"
                            : "Incorrect organization!",
                },
            });
        } 
    
        req.body.organization = organization?.value??'';
        next();
    }
}
