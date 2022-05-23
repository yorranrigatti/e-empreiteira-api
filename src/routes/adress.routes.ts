import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import AdressController from "../controllers/adressController";
import ensureAuth from "../middlewares/ensureAuth.middleware";
import createAdressSchema from "../validations/adress/createAdress.validation";

const adressRouter = Router();

adressRouter.use(ensureAuth);

adressRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: createAdressSchema }),
  AdressController.store
);

adressRouter.get("/", AdressController.index);

adressRouter.get("/:id", AdressController.show);

adressRouter.patch("/:id", AdressController.update);

adressRouter.delete("/:id", AdressController.delete);

export default adressRouter;
