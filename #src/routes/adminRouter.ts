import Router from "express";

import fileUpload from "express-fileupload";

import { attendeesMiddlewares } from "../middlewares/attendeesMiddlewares";
import { attendeesGetMiddlewares } from "../middlewares/adminGetMiddlewares";
import { Admin } from "../controllers/adminController";

export const adminRouter = Router();

adminRouter.use(Router.json());

const admin = new Admin();

adminRouter.use(
    fileUpload({
        defCharset: "utf-8",
        defParamCharset: "utf-8",
    })
);

adminRouter.post("/attendees/mass", attendeesMiddlewares, admin.massReg);
adminRouter.patch("/attendees/:id", attendeesMiddlewares, admin.update);
adminRouter.delete("/attendees/:id", attendeesMiddlewares, admin.delete);
adminRouter.get("/attendees/", attendeesGetMiddlewares, admin.getList);

