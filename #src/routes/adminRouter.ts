import Router from "express";

import fileUpload from "express-fileupload";

import { Admin } from "../controllers/adminController";
import { adminDeleteMiddlewares } from "../middlewares/adminDeleteMiddlewares";
import { tokenAuthorizeCheck } from "../middlewares/tokenAuthorizeCheck";
import { typeCheck } from "../middlewares/typeCheck";
import { adminMassRegMiddlewares } from "../middlewares/adminMassRegMiddlewares";
import { adminUpdateFilterMiddleware } from "../middlewares/adminUpdateFilterMiddleware";
import { userExists } from "../middlewares/userExists";
import { adminUserUpdateMiddlewares } from "../middlewares/adminUserUpdateMiddlewares";

export const adminRouter = Router();

adminRouter.use(Router.json());

const admin = new Admin();

adminRouter.use(
    fileUpload({
        defCharset: "utf-8",
        defParamCharset: "utf-8",
    })
);

adminRouter.post("/attendees/mass", adminMassRegMiddlewares, admin.massReg);

adminRouter.get("/attendees/", [tokenAuthorizeCheck(), typeCheck('org')], admin.getList);
adminRouter.patch("/attendees/:id", adminUserUpdateMiddlewares, admin.update);
adminRouter.delete("/attendees/:id", adminDeleteMiddlewares, admin.delete);
adminRouter.get("/partners/", [tokenAuthorizeCheck(), typeCheck('org')], admin.partners);
adminRouter.post("/partners/", [tokenAuthorizeCheck(), typeCheck('org')], admin.partnersGen);
adminRouter.get("/partners/download/", [tokenAuthorizeCheck(), typeCheck('org')], admin.partnersDownload);

