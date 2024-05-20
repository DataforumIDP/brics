import { body } from "express-validator";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { companyExistsMiddlewares } from "./companyExistsMiddlewares";
import { attendeedUnexistsCheck } from "./attendeedUnexistsCheck";

export const nameMiddleware = body("name")
    .isLength({ min: 3, max: 30 })
    .withMessage({
        ru: "Длина Имени от 3-х до 30-ти символов!",
        en: "The length of the Name is from 3 to 30 characters!",
    });

export const surnameMiddleware = body("surname")
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Фамилии от 3-х до 30-ти символов!");

export const lastnameMiddleware = body("lastname")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Отчества от 3-х до 50-ти символов!");

export const organizationMiddleware = body("organization")
    .isLength({ min: 3, max: 20 })
    .withMessage("Некорректная организация!");

export const gradeMiddleware = body("grade")
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Должности от 3-х до 60-ти символов!");

const mailMiddleware = body("mail")
    .isEmail()
    .withMessage("Некорректная почта!");

const phoneMiddleware = body("phone")
    .isLength({ min: 3, max: 30 })
    .custom(notHasLetters)
    .withMessage("Некорректный номер телефона!");

const countryMiddleware = body("country")
    .isLength({ min: 2, max: 60 })
    .withMessage("Длина названия Страны от 2-х до 60-ти символов");

const cityMiddleware = body("city")
    .isLength({ min: 2, max: 60 })
    .withMessage("Длина названия Города от 2-х до 60-ти символов");

function notHasLetters(item: string) {
    return /^[0-9+\-()]*$/.test(item);
}

export const attendeesMiddlewares = [
    nameMiddleware,
    surnameMiddleware,
    lastnameMiddleware,
    organizationMiddleware,
    gradeMiddleware,
    mailMiddleware,
    phoneMiddleware,
    countryMiddleware,
    cityMiddleware,
    inputValidationMiddleware,
    attendeedUnexistsCheck,
    companyExistsMiddlewares,
];
