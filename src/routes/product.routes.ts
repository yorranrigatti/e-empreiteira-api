import { Router } from "express";

import ProductController from "../controllers/product/product.controller";

const productController = new ProductController();

const routes = Router();

export const productRoutes = () => {
  routes.post("", productController.store);
  routes.get("", productController.index);
  routes.get("/:product_id", productController.show);
  routes.patch("/:product_id", productController.update);
  routes.delete("/:product_id", productController.delete);

  return routes;
};
