import Router from "express";

import { User } from "../controllers/usersController";
import { attendeesMiddlewares } from "../middlewares/attendeesMiddlewares";

export const userRouter = Router();

userRouter.use(Router.json());

const user = new User();

userRouter.post("/", attendeesMiddlewares, user.reg);
userRouter.post("/account", attendeesMiddlewares, user.reg);
