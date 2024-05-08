import { ReqWithBody } from "../../baseTypes";
import { lang } from "../langModel";


export type UserCreateRequest = ReqWithBody<UserRegData>

export type UserRegData = {
    name: string,
    surname: string,
    lastname: string | undefined,
    phone: string,
    birth: string,
    password: string,
    invite: string,
    lang: lang,
}

