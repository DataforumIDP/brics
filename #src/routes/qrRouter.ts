import Router from "express";

import { Qr } from "../controllers/qrController";

export const qrRouter = Router();

qrRouter.use(Router.json());

const qrController = new Qr()

qrRouter.post('/new', qrController.uploadNewQRs)