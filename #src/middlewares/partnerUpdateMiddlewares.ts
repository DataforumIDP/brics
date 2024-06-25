import { body } from "express-validator";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { companyExistsMiddlewares } from "./companyExistsMiddlewares";

const reminderMiddleware = body("reminder")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Длинна до 200 символов");

const descriptionMiddleware = body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Длинна до 200 символов");

const contactsMiddleware = body("contacts")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Длинна до 200 символов");

const siteMiddleware = body("site")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Длинна до 200 символов");

export const partnerUpdateMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("partner"),
    reminderMiddleware,
    descriptionMiddleware,
    contactsMiddleware,
    siteMiddleware,
    inputValidationMiddleware,
    companyExistsMiddlewares({ optional: true }),
];
