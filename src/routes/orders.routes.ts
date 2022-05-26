import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import OrdersController from "../controllers/orders.controller";
import verifyOrderIdExistMiddleware from "../middlewares/verifyOrderIdExist.middleware";
import createOrderSchema from "../validations/createOrder.validation";

const ordersRoutes = Router();

ordersRoutes.post(
  "",
  expressYupMiddleware({ schemaValidator: createOrderSchema }),
  OrdersController.store
);
ordersRoutes.get("", OrdersController.index);
ordersRoutes.get("/:id", verifyOrderIdExistMiddleware, OrdersController.show);
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
