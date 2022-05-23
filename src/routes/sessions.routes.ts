import { Router } from "express";
import SessionController from "../controllers/sessionsController";

const sessionsRouter = Router();

sessionsRouter.post("/", SessionController.store);

export default sessionsRouter;
