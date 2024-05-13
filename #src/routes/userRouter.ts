import Router from "express";
import fs from "fs";
import fileUpload from "express-fileupload";

import { User } from "../controllers/usersController";
import { usersFromExelMiddlewares } from "../middlewares/usersFromExelMiddlewares";
import { attendeesMiddlewares } from "../middlewares/attendeesMiddlewares";

export const userRouter = Router();

if (!fs.existsSync(global.uploadDir)) {
    fs.mkdirSync(global.uploadDir);
}

userRouter.use(Router.json());

const user = new User()

userRouter.use(fileUpload({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));

userRouter.post('/from-exel', usersFromExelMiddlewares, user.regFromExel)
userRouter.post('/attendees', attendeesMiddlewares, user.regAttendees)
// userRouter.get('/:file', user.get)

let i = `/* SQL */ INSERT INTO user (name, code) VALUES ('Иван', (SELECT code FROM qr WHERE used=false LIMIT 1))`