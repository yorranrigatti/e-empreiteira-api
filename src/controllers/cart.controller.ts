import { Request, Response } from "express";
import cartAddProductService from "../services/cart/cartAddProduct.service";
export default class CartController {
  async cartAddProduct(req: Request, res: Response) {
    const { product_id } = req.body;
    const client_id = req.client.id;
    const cart = await cartAddProductService(product_id, client_id);

    res.status(200).json({ client_id, cart });
  }
}
