import { Router } from "express";

import CartController from "../controllers/cart.controller";
import ensureAuth from "../middlewares/ensureAuth.middleware";

const cartController = new CartController();

const cartRouter = Router();

cartRouter.use(ensureAuth);

cartRouter.post("/add", cartController.cartAddProduct);
cartRouter.delete("/empty", cartController.emptyCart);
cartRouter.delete("/empty/id", cartController.emptyCartById);

export default cartRouter;
