import { Express } from "express";
import adressRouter from "./adress.routes";
import clientRouter from "./client.routes";
import sessionsRouter from "./sessions.routes";
import companiesRouter from "./companies.routes";
import companyOwnerRouter from "./companyOwner.routes";

export const appRoutes = (app: Express) => {
  app.use("/owner", companyOwnerRouter);
  app.use("/clients", clientRouter);
  app.use("/sessions", sessionsRouter);
  app.use("/adress", adressRouter);
  app.use("/companies", companiesRouter);
};
