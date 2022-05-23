import { Express } from "express";
import adressRouter from "./adress.routes";
import clientRouter from "./client.routes";
import sessionsRouter from "./sessions.routes";
import productRouter from "./product.routes";
import cartRouter from "./cart.routes";

export const appRoutes = (app: Express) => {
  app.use("/clients", clientRouter);
  app.use("/sessions", sessionsRouter);
  app.use("/address", adressRouter);
  app.use("/products", productRouter);
  app.use("/cart", cartRouter);
};
