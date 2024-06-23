import { adminTableMiddleware } from "./adminTableMiddleware";
import { tableUploadMiddleware } from "./tableUploadMiddleware";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";

export const adminMassRegMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("org"),
    tableUploadMiddleware([
        "surname",
        "name",
        "lastname",
        "passport",
        "grade",
        "activity",
        "type",
        "organization",
        "country",
        "city",
        "mail",
        "phone",
    ]),
    adminTableMiddleware
];
