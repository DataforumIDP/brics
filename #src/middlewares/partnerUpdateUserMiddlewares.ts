import { body } from "express-validator";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";

const nameMiddleware = body("name")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("Длина имени от 2х до 30ти символов");
const surnameMiddleware = body("surname")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("Длина фамилии от 2х до 30ти символов");
const lastnameMiddleware = body("lastname")
    .optional()
    .isLength({ max: 30 })
    .withMessage("Длина отчества от 2х до 30ти символов");

export const partnerUpdateUserMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("partner"),
    nameMiddleware,
    surnameMiddleware,
    lastnameMiddleware,
    inputValidationMiddleware,
];
