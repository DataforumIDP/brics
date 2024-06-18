import { partnerTableMiddleware } from "./partnerTableMiddleware";
import { tableUploadMiddleware } from "./tableUploadMiddleware";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";

export const partnerMassRegMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck("partner"),
    tableUploadMiddleware([
        "surname",
        "name",
        "lastname",
        "passport",
        "grade",
        "activity",
    ]),
    partnerTableMiddleware
];
