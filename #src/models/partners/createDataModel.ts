import { ReqWithBody } from "../../baseTypes";

export type CreatePartnerRequest = ReqWithBody<CreaetePartnerData>;

export type CreaetePartnerData = {
    name: string;
    surname: string;
    lastname?: string;
    grade: string;
    mail: string;
    passport: string;
    activity: string;
};
