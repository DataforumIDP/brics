import { GroupeData } from "../groupe/getGroupeModel";
import { lang } from "../langModel";

export type UserData = {
    id: string,
    name: string,
    surname: string,
    lastname: string | undefined,
    phone: string,
    birth: string,
    groupe: GroupeData,
    lang: lang,
    invite: string,
    password: string,
    salt: string,
    access_lvl: string,
    reg_timestamp: number
}

let userData: UserData

export function setUserData(data: UserData): void {
    userData = data
}

export function getUserData(): UserData{
    return userData
}