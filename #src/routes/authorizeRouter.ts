
import Router from "express";
import { authorize } from "../controllers/authorizeController";

export const authRouter = Router();

authRouter.use(Router.json());

authRouter.post("/", [], authorize);