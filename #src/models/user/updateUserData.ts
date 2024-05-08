import { ReqWithBody } from "../../baseTypes";
import { UserData } from "./getUserDataModel";


export type UpdateUserData = Partial<UserData>

export type UpdateUserRequest = ReqWithBody<UpdateUserData>