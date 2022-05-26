import { Router } from "express";

import EmploeeController from "../controllers/emploee.Controller";

const emploeeRouter = Router();

emploeeRouter.post("/:id", EmploeeController.store);
emploeeRouter.get("", EmploeeController.index);
emploeeRouter.get("/:id", EmploeeController.show);
// emploeeRouter.get("/company/:company_id", EmploeeController.showByCompany);
emploeeRouter.patch("/:id", EmploeeController.update);
emploeeRouter.delete("/:id", EmploeeController.delete);

export default emploeeRouter;
