import { Express } from "express";
import adressRouter from "./adress.routes";
import clientRouter from "./client.routes";
import sessionsRouter from "./sessions.routes";

export const appRoutes = (app: Express) => {
  app.use("/clients", clientRouter);
  app.use("/sessions", sessionsRouter);
  app.use("/adress", adressRouter);
};
