import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import CompaniesController from "../controllers/companies.controller";
import SetAddressCompanyController from "../controllers/setAddressCompany.controller";
import authOwnerMiddleware from "../middlewares/authOwner.middleware";
import createCompanySchema from "../validations/createCompany.validation";

const companiesRouter = Router();

companiesRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: createCompanySchema }),
  CompaniesController.store
);
companiesRouter.get("/", authOwnerMiddleware, CompaniesController.index);
companiesRouter.get("/:id", authOwnerMiddleware, CompaniesController.show);
companiesRouter.patch("/:id", authOwnerMiddleware, CompaniesController.update);
companiesRouter.delete("/:id", authOwnerMiddleware, CompaniesController.delete);

companiesRouter.post(
  "/adress",
  authOwnerMiddleware,
  SetAddressCompanyController.store
);

export default companiesRouter;
