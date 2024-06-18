import { ReqWithBody, ReqWithParams } from "../../baseTypes";
import { CreatePartnerData } from "./createDataModel";

export type UpdatePartnerRequest = ReqWithParams<{ id: string }> &
    ReqWithBody<Partial<CreatePartnerData>>;
