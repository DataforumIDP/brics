import Router from "express";

import fileUpload from "express-fileupload";

import { User } from "../controllers/usersController";
import { attendeesMiddlewares } from "../middlewares/attendeesMiddlewares";

export const userRouter = Router();

userRouter.use(Router.json());

const user = new User();

userRouter.use(
    fileUpload({
        defCharset: "utf-8",
        defParamCharset: "utf-8",
    })
);

userRouter.post("/", attendeesMiddlewares, user.reg);
