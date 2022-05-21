import { Express } from "express";
import { productRoutes } from "./product.routes";

export const appRoutes = (app: Express) => {
  app.use("/products", productRoutes());
};
