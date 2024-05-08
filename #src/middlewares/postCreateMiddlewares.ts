import { body } from "express-validator";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { inputValidationMiddleware } from "./inputValidationMiddleware";
import { isNotArray } from "../utils/isNoArray";
import { fileTypes } from "../utils/getAccessFileTypes";


const titleMiddlewares = body("title")
    .isLength({ min: 4, max: 100 })
    .withMessage("Длинна заголовка 4-100 символов!");
const textMiddlewares = body("text")
    .isLength({ min: 4, max: 10000 })
    .withMessage("Длинна текста 4-10000 символов!");

const dateMiddlewares = body("date")
    .optional()
    .custom(customDateCheck)
    .withMessage("Дата рождения не соответствует формату ДД.ММ.ГГГГ!");

const imgMiddlewares = body("images")
    .optional()
    .custom((item: string) => {
        const arr = Array.from(item);
        if (isNotArray(arr) && item != '') throw new Error();
        if (arr.find((item) => !fileTypes.img.includes(item.split(".")[item.split(".").length-1])))
            throw new Error();
        return true;
    }).withMessage('Некорректные фотографии!')

const categoriesMiddlewares = body("categories")
    .optional()
    .custom((item: string) => {
        const arr = Array.from(item);
        if (isNotArray(arr) && item != '') throw new Error();
        return true;
    }).withMessage('Некорректные категории!')

function customDateCheck(value: string) {
    const formattedDate = value.split(".").reverse().join("-");

    if (
        new Date(formattedDate).toDateString() == "Invalid Date" ||
        formattedDate.length != 10
    )
        throw new Error();

    return true;
}

export const postCreateMiddlewares = [
    tokenAuthorizeCheck,
    titleMiddlewares,
    textMiddlewares,
    dateMiddlewares,
    imgMiddlewares,
    categoriesMiddlewares,
    inputValidationMiddleware,
];
