import { filesValidation } from "./fileValidation";
import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";


export const filesUploadMiddlewares = [
    tokenAuthorizeCheck,
    filesValidation
]