import { body } from "express-validator";
import { adminUpdateFilterMiddleware } from "./adminUpdateFilterMiddleware";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { userExists } from "./userExists";
import { inputValidationMiddleware } from "./inputValidationMiddleware";

const typeMiddleware = body("type")
    .optional()
    .custom((item) => {
        if (allowedTypes.includes(item)) return true;
        throw new Error();
    })
    .withMessage("Недопустимый тип!");

const nameMiddleware = body("name")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Имени от 3-х до 30-ти символов!");

const surnameMiddleware = body("surname")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Фамилии от 3-х до 30-ти символов!");

const lastnameMiddleware = body("lastname")
    .optional()
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Отчества от 3-х до 30-ти символов!");

const gradeMiddleware = body("grade")
    .optional()
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Должности от 3-х до 60-ти символов!");

const passportMiddleware = body("passport")
    .optional()
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Паспорта от 3-х до 60-ти символов!");

const activityMiddleware = body("activity")
    .optional()
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Деятельности от 3-х до 60-ти символов!");

const accreditationMiddleware = body("accreditation")
    .optional()
    .isBoolean()
    .withMessage("Некорректное значение!");

const allowedTypes = ["attendees", "vip", "org", "smi", "speacker", "stuff"];

export const adminUserUpdateMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("org"),
    userExists,
    adminUpdateFilterMiddleware,
    typeMiddleware,
    nameMiddleware,
    surnameMiddleware,
    lastnameMiddleware,
    gradeMiddleware,
    passportMiddleware,
    activityMiddleware,
    accreditationMiddleware,
    inputValidationMiddleware,
];
