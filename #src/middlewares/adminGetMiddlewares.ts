import { tokenAuthorizeCheck } from "./tokenAuthorizeCheck";


export const attendeesGetMiddlewares = [
    tokenAuthorizeCheck({optional: true})
]