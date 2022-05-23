import { Express } from "express";
import companiesRouter from "./companies.routes";

export const appRoutes = (app: Express) => {
  app.use("/companies", companiesRouter);
};
