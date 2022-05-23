import { Router } from "express";
import CompaniesController from "../controllers/companies.controller";
//importar middleware de autenticação

const companiesRouter = Router();

companiesRouter.post("/", CompaniesController.store);
companiesRouter.get("/", CompaniesController.index);
companiesRouter.get("/:id", CompaniesController.show);
companiesRouter.patch("/:id", CompaniesController.update);
companiesRouter.delete("/:id", CompaniesController.delete);

export default companiesRouter;
