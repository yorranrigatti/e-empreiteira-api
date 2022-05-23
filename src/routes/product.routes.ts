import { Router } from "express";

import ProductController from "../controllers/product.controller";

const productController = new ProductController();

const productRouter = Router();

productRouter.post("", productController.store);
productRouter.get("", productController.index);
productRouter.get("/:product_id", productController.show);
productRouter.get("/company/:company_id", productController.showByCompany);
productRouter.patch("/:product_id", productController.update);
productRouter.delete("/:product_id", productController.delete);

export default productRouter;
