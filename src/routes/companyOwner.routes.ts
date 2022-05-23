import { Router } from "express";
import CompanyOwnerController from "../controllers/companyOwner.controller";

const companyOwnerRouter = Router();

companyOwnerRouter.post("", CompanyOwnerController.store);
companyOwnerRouter.get("", CompanyOwnerController.index);
companyOwnerRouter.get("/:id", CompanyOwnerController.show);
companyOwnerRouter.patch("/:id", CompanyOwnerController.update);
companyOwnerRouter.delete("/:id", CompanyOwnerController.delete);

companyOwnerRouter.post("/login", CompanyOwnerController.login);

export default companyOwnerRouter;
