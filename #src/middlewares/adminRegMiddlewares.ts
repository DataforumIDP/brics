import { body } from "express-validator";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";

const surnameMiddleware = body("surname")
    .isLength({ min: 1, max: 30 })
    .withMessage("Фамилия максимум 30 сомволов!");

const nameMiddleware = body("name")
    .isLength({ min: 1, max: 30 })
    .withMessage("Имя максимум 30 сомволов!");

const lasnameMiddleware = body("lastname")
    .optional()
    .isLength({ min: 1, max: 30 })
    .withMessage("Отчество максимум 30 сомволов!");

export const adminRegMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("org"),
    surnameMiddleware,
    nameMiddleware,
    lasnameMiddleware,
    inputValidationMiddleware,
];
