import { Request, Response } from "express";
import cartAddProductService from "../services/cart/cartAddProduct.service";
import cartEmptyService from "../services/cart/cartEmpty.service";
import cartEmptyByIdService from "../services/cart/cartEmptyById.service";
import cartRemoveProductService from "../services/cart/cartRemoveProduct.service";
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

    return res.status(200).json({ message: "cart emptied", client_id, cart });
  }

  async emptyCartById(req: Request, res: Response) {
    const { client_id, cart_id } = req.body;
    const cart = await cartEmptyByIdService(client_id, cart_id);

    return res.status(200).json({ message: "cart emptied", cart });
  }

  async cartRemoveProduct(req: Request, res: Response) {
    const client_id = req.client.id;
    const { product_id } = req.body;

    const removedProduct = await cartRemoveProductService(
      client_id,
      product_id
    );

    return res.status(200).json({ message: "product removed", removedProduct });
  }
}
