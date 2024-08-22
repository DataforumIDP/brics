import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";
import { userExists } from "./userExists";


export const adminDeleteMiddlewares = [
    tokenAuthorizeCheck(),
    typeCheck('org'),
    userExists,
]