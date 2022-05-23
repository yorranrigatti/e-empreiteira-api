import { Router } from "express";

import CartController from "../controllers/cart.controller";
import ensureAuth from "../middlewares/ensureAuth.middleware";

const cartController = new CartController();

const cartRouter = Router();

cartRouter.use(ensureAuth);

cartRouter.post("/add", cartController.cartAddProduct);

export default cartRouter;
