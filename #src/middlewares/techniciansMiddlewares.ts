import { body } from "express-validator";

import {
    gradeMiddleware,
    lastnameMiddleware,
    nameMiddleware,
    organizationMiddleware,
    surnameMiddleware,
} from "./attendeesMiddlewares";

import { companyExistsMiddlewares } from "./companyExistsMiddlewares";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { techniciansUnexistsCheck } from "./techniciansUnexistsCheck";

const activityMiddleware = body("activity")
    .isLength({ min: 3, max: 80 })
    .withMessage({
        ru: "Вид деятельности может быть от 3-х до 80-ти символов!",
        en: "The type of activity can be from 3 to 80 characters!",
    });

const passportMiddleware = body("passport")
    .isLength({ min: 8, max: 20 })
    .withMessage({
        ru: "Некорректный номер паспорта!",
        en: "Incorrect passport number!",
    });

export const techniciansMiddlewares = [
    nameMiddleware,
    surnameMiddleware,
    lastnameMiddleware,
    organizationMiddleware,
    gradeMiddleware,
    activityMiddleware,
    passportMiddleware,
    inputValidationMiddleware,
    techniciansUnexistsCheck,
    companyExistsMiddlewares,
];
