import { body } from "express-validator";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { companyExistsMiddlewares } from "./companyExistsMiddlewares";

const reminderMiddleware = body("reminder")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Длинна 3-200 символов");

const descriptionMiddleware = body("description")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Длинна 3-200 символов");

const contactsMiddleware = body("contacts")
    .optional()
    .custom(items => {        
        if (items === null) return true
        if ((items as string[]).every(item=>item.length<200)) return true
        throw new Error()
    })
    .withMessage("Максимальная длинна одного контакта 200 символов");

const siteMiddleware = body("site")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Длинна 3-200 символов");

export const partnerUpdateMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("partner"),
    reminderMiddleware,
    descriptionMiddleware,
    contactsMiddleware,
    siteMiddleware,
    inputValidationMiddleware,
    companyExistsMiddlewares({optional: true}),
];
