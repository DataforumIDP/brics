import { partnerUserExists } from "./partnerUserExists";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";
import { typeCheck } from "./typeCheck";


export const partnerDeleteMiddleware = [
    tokenAuthorizeCheck(),
    typeCheck('partner'),
    partnerUserExists
]