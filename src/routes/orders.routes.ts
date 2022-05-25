import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import OrdersController from "../controllers/orders.controller";
import verifyOrderIdExistMiddleware from "../middlewares/verifyOrderIdExist.middleware";
import createOwnerSchema from "../validations/createOwner.validation";

const ordersRoutes = Router();

ordersRoutes.post(
  "",
  expressYupMiddleware({ schemaValidator: createOwnerSchema }),
  OrdersController.store
);
ordersRoutes.get("", OrdersController.index);
ordersRoutes.get(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.show
);
ordersRoutes.patch(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.update
);
ordersRoutes.delete(
  "/:id",
  verifyOrderIdExistMiddleware,
  OrdersController.delete
);

export default ordersRoutes;
