import { ReqWithBody, ReqWithParams } from "../../baseTypes";
import { CreaetePartnerData } from "./createDataModel";

export type UpdatePartnerRequest = ReqWithParams<{ id: string }> &
    ReqWithBody<Partial<CreaetePartnerData>>;
