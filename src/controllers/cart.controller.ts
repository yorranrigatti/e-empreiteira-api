import { Request, Response } from "express";
import cartAddProductService from "../services/cart/cartAddProduct.service";
import cartEmptyService from "../services/cart/cartEmpty.service";
export default class CartController {
  async cartAddProduct(req: Request, res: Response) {
    const { product_id } = req.body;
    const client_id = req.client.id;
    const cart = await cartAddProductService(product_id, client_id);

    return res.status(200).json({ client_id, cart });
  }

  async emptyCart(req: Request, res: Response) {
    const client_id = req.client.id;
    const cart = await cartEmptyService(client_id);

    return res.status(200).json({ message: "cart emptied", cart });
  }
}
