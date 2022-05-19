import { Express } from "express";
import clientRouter from "./client.routes";
import sessionsRouter from "./sessions.routes";

export const appRoutes = (app: Express) => {
  app.use("/clients", clientRouter);
  app.use("/sessions", sessionsRouter);
};
