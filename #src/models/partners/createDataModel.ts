import { ReqWithBody } from "../../baseTypes";

export type CreatePartnerRequest = ReqWithBody<CreatePartnerData>;

export type CreatePartnerData = {
    name: string;
    surname: string;
    lastname?: string;
    grade: string;
    passport: string;
    activity: string;
};
