import { body } from "express-validator";

import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";

const nameMiddleware = body("name")
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Имени от 3-х до 30-ти символов!");

const surnameMiddleware = body("surname")
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Фамилии от 3-х до 30-ти символов!");

const lastnameMiddleware = body("lastname")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Отчества от 3-х до 30-ти символов!");

const gradeMiddleware = body("grade")
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Должности от 3-х до 60-ти символов!");

const passportMiddleware = body("passport")
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Паспорта от 3-х до 60-ти символов!");

const activityMiddleware = body("activity")
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Деятельности от 3-х до 60-ти символов!");

export const partnerRegMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("partner"),
    nameMiddleware,
    surnameMiddleware,
    lastnameMiddleware,
    gradeMiddleware,
    passportMiddleware,
    activityMiddleware,
    inputValidationMiddleware,
];
