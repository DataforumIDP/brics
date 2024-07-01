import Router from "express";

import { attendeesMiddlewares } from "../middlewares/attendeesMiddlewares";
import { Partner } from "../controllers/partnersController";
import { partnerRegMiddlewares } from "../middlewares/partnerRegMiddlewares";
import { tokenAuthorizeCheck } from "../middlewares/tokenAuthorizeCheck";
import { typeCheck } from "../middlewares/typeCheck";
import { partnerDeleteMiddleware } from "../middlewares/partnerDeleteMiddleware";
import { partnerUpdateMiddlewares } from "../middlewares/partnerUpdateMiddlewares";
import fileUpload from "express-fileupload";
import { partnerMassRegMiddlewares } from "../middlewares/partnerMassRegMiddlewares";
import { partnerUpdateUserMiddlewares } from "../middlewares/partnerUpdateUserMiddlewares";

export const partnerRouter = Router();

partnerRouter.use(Router.json());

const partner = new Partner();

partnerRouter.post("/", partnerRegMiddlewares, partner.reg);
partnerRouter.get("/", [tokenAuthorizeCheck(), typeCheck('partner')], partner.info);
partnerRouter.patch("/", partnerUpdateMiddlewares, partner.updateInfo);
partnerRouter.get("/list", [tokenAuthorizeCheck(), typeCheck('partner')], partner.list);
partnerRouter.patch("/:id", partnerUpdateUserMiddlewares, partner.update);
partnerRouter.delete("/:id", partnerDeleteMiddleware, partner.delete);

partnerRouter.use(fileUpload({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));
partnerRouter.post("/mass", partnerMassRegMiddlewares, partner.massReg);