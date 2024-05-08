import Router from "express";
import fs from "fs";
import fileUpload from "express-fileupload";
import { File } from "../controllers/filesController";
import { filesUploadMiddlewares } from "../middlewares/filesUploadMiddlewares";

export const filesRouter = Router();

if (!fs.existsSync(global.uploadDir)) {
    fs.mkdirSync(global.uploadDir);
}

filesRouter.use(Router.json());

const fileController = new File()

filesRouter.use(fileUpload({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));

filesRouter.post('/', filesUploadMiddlewares, fileController.upload)
filesRouter.get('/:file', fileController.get)