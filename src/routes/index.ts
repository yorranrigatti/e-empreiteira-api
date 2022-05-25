import { Express } from "express";
import adressRouter from "./adress.routes";
import clientRouter from "./client.routes";
import sessionsRouter from "./sessions.routes";
import companiesRouter from "./companies.routes";
import companyOwnerRouter from "./companyOwner.routes";
import ordersRoutes from "./orders.routes";
// import stockProductRouter from "./stockProducts.routes";
import productRouter from "./product.routes";
import cartRouter from "./cart.routes";

export const appRoutes = (app: Express) => {
  app.use("/orders", ordersRoutes);
  app.use("/owner", companyOwnerRouter);
  app.use("/clients", clientRouter);
  app.use("/sessions", sessionsRouter);
  app.use("/companies", companiesRouter);
  // app.use("/stock", stockProductRouter);
  app.use("/address", adressRouter);
  app.use("/products", productRouter);
  app.use("/cart", cartRouter);
};
