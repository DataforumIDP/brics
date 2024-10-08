import { body } from "express-validator";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { companyExistsMiddlewares } from "./companyExistsMiddlewares";

export const nameMiddleware = body("name")
    .isLength({ min: 2, max: 30 })
    .withMessage({
        ru: "Длина Имени от 2-х до 30-ти символов",
        en: "The length of the Name is from 2 to 30 characters",
    });

export const surnameMiddleware = body("surname")
    .isLength({ min: 2, max: 30 })
    .withMessage({
        ru: "Длина Фамилии от 2-х до 30-ти символов",
        en: "The length of the Lastname is from 2 to 30 characters",
    });

export const lastnameMiddleware = body("lastname")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage({
        ru: "Длина Отчества от 2-х до 30-ти символов",
        en: "The length of the Patronymic is from 2 to 30 characters",
    });

export const organizationMiddleware = body("organization")
    .isLength({ min: 3, max: 20 })
    .withMessage({
        ru: "Некорректная организация",
        en: "Incorrect organization",
    });

export const gradeMiddleware = body("grade")
    .isLength({ min: 3, max: 60 })
    .withMessage({
        ru: "Длина Должности от 3-х до 60-ти символов",
        en: "The length of the Post is from 3 to 60 characters",
    });

const mailMiddleware = body("mail").isEmail().withMessage({
    ru: "Некорректный Email",
    en: "Incorrect Email",
});

const phoneMiddleware = body("phone")
    .isLength({ min: 3, max: 30 })
    .custom(notHasLetters)
    .withMessage({
        ru: "Некорректный номер телефона",
        en: "Incorrect phone number",
    });

const countryMiddleware = body("country")
    .isLength({ min: 2, max: 60 })
    .withMessage({
        ru: "Длина названия Страны от 2-х до 60-ти символов",
        en: "The length of the Country name is from 2 to 60 characters",
    });

const cityMiddleware = body("city").isLength({ min: 2, max: 60 }).withMessage({
    ru: "Длина названия Города от 2-х до 60-ти символов",
    en: "The length of the City name is from 2 to 60 characters",
});

const typeMiddleware = body("type")
    .custom((item) => {
        if (types.includes(item)) return true;
        throw new Error();
    })
    .withMessage({
        ru: "Некорректный тип",
        en: "Incorrect type",
    });

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
    typeMiddleware,
    inputValidationMiddleware,
    companyExistsMiddlewares(),
];

const types = [
    "attendees",
    "smi",
    "speacker",
    "green"
    // "attendees",
    // "smi",
    // "speacker",
    // "vip",
    // "org",
    // "partner",
    // "stuff",
];
