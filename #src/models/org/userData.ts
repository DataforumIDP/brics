import { ReqWithBody, ReqWithParams } from "../../baseTypes";

export type UserUpdateRequest = ReqWithBody<Partial<UserData>> & ReqWithParams<{id: string}>

export type UserData = {
    name: string;
    surname: string;
    lastname?: string;
    organization: string;
    grade: string;
    mail: string;
    phone: string;
    country: string;
    city: string;
    type: string;
    accreditation: boolean;
    activity: string;
    passport: string;
}