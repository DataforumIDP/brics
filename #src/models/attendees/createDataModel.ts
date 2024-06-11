import { ReqWithBody } from "../../baseTypes";

export type RegAttendeesRequest = ReqWithBody<RegAttendeesData>;

export type RegAttendeesData = {
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
};
