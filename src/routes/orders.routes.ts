import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import OrdersController from "../controllers/orders.controller";
import verifyOrderIdExistMiddleware from "../middlewares/verifyOrderIdExist.middleware";
import createOwnerSchema from "../validations/createOwner.validation";

const companyOwnerRouter = Router();

companyOwnerRouter.post(
  "",
  expressYupMiddleware({ schemaValidator: createOwnerSchema }),
  OrdersController.store
);
companyOwnerRouter.get("", OrdersController.index);
companyOwnerRouter.get(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.show
);
companyOwnerRouter.patch(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.update
);
companyOwnerRouter.delete(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.delete
);

export default companyOwnerRouter;
