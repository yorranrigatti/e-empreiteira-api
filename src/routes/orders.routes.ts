import { Router } from "express";
import OrdersController from "../controllers/orders.controller";
import verifyOrderIdExistMiddleware from "../middlewares/verifyOrderIdExist.middleware";

const companyOwnerRouter = Router();

companyOwnerRouter.post("", OrdersController.store);
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
