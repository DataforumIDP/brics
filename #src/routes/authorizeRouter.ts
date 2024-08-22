
import Router from "express";
import { authorize, getTypeOfAccount } from "../controllers/authorizeController";
import { tokenAuthorizeCheck } from "../middlewares/tokenAuthorizeCheck";

export const authRouter = Router();

authRouter.use(Router.json());

authRouter.post("/", [], authorize);
authRouter.post("/type", [tokenAuthorizeCheck()], getTypeOfAccount);