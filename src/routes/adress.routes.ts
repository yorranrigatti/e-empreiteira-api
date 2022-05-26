import { Router } from "express";
import AdressController from "../controllers/adressController";
import ensureAuth from "../middlewares/ensureAuth.middleware";

const adressRouter = Router();

adressRouter.use(ensureAuth);

adressRouter.get("/", AdressController.index);

adressRouter.get("/:id", AdressController.show);

export default adressRouter;
