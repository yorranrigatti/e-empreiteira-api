import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import CompanyOwnerController from "../controllers/companyOwner.controller";
import ensureAuth from "../middlewares/ensureAuth.middleware";
import verifyOwnerAlreadyExistsMiddleware from "../middlewares/verifyOwnerAlreadyExists.middleware";
import verifyOwnerIdMiddleware from "../middlewares/verifyOwnerId.middleware";
import createOwnerSchema from "../validations/createOwner.validation";

const companyOwnerRouter = Router();

companyOwnerRouter.post(
  "",
  expressYupMiddleware({ schemaValidator: createOwnerSchema }),
  CompanyOwnerController.store
);
companyOwnerRouter.post("/login", CompanyOwnerController.login);
companyOwnerRouter.use(ensureAuth);
companyOwnerRouter.get("", CompanyOwnerController.index);
companyOwnerRouter.get(
  "/:id",
  verifyOwnerIdMiddleware,
  CompanyOwnerController.show
);
companyOwnerRouter.patch(
  "/:id",
  verifyOwnerIdMiddleware,
  CompanyOwnerController.update
);
companyOwnerRouter.delete(
  "/:id",
  verifyOwnerIdMiddleware,
  CompanyOwnerController.delete
);

export default companyOwnerRouter;
