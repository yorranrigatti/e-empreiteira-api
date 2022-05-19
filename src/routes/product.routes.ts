import { Router } from "express";

import ProductController from "../controllers/product/product.controller";

const productController = new ProductController();

const routes = Router();

export const productRoutes = () => {
  routes.post("", productController.store);

  return routes;
};
