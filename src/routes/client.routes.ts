import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import ClientController from "../controllers/clientController";
import ensureAuth from "../middlewares/ensureAuth.middleware";
import createClientSchema from "../validations/client/createClient.validation";

const clientRouter = Router();

clientRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: createClientSchema }),
  ClientController.store
);

clientRouter.use(ensureAuth);

clientRouter.get("/", ClientController.index);

clientRouter.get("/:id", ClientController.show);

clientRouter.patch("/:id", ClientController.update);

clientRouter.delete("/:id", ClientController.delete);

clientRouter.post("/:id/adress", ClientController.setAdress);

clientRouter.delete("/:id/adress", ClientController.deleteAdress);

export default clientRouter;
