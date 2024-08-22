import Router from "express";
import { File } from "../controllers/fileController";
import { tokenAuthorizeCheck } from "../middlewares/tokenAuthorizeCheck";
import { typeCheck } from "../middlewares/typeCheck";
import fileUpload from "express-fileupload";
export const fileRouter = Router();

fileRouter.use(Router.json());

const file = new File();

fileRouter.use(fileUpload({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));

fileRouter.post("/", [tokenAuthorizeCheck(), typeCheck('partner')], file.upload);
fileRouter.get("/:file", [tokenAuthorizeCheck()], file.get);