import { Express } from "express";
import { errorMiddleware } from "../middlewares/error.middleware";
import { productRoutes } from "./product.routes";

export const appRoutes = (app: Express) => {
  app.use("/products", productRoutes());
};
