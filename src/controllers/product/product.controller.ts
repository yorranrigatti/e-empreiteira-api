import { Request, Response } from "express";
import productCreateService from "../../services/product/productCreate.service";
import productDeleteService from "../../services/product/productDelete.service";
import productGetByIdService from "../../services/product/productgetById.service";
import productListService from "../../services/product/productList.service";
export default class ProductController {
  async store(req: Request, res: Response) {
    const { name, company_id } = req.body;
    const product = await productCreateService(name, company_id);
    return res.status(201).json({ message: "product registered", product });
  }

  async index(req: Request, res: Response) {
    const products = await productListService();
    return res.status(200).json({ products });
  }

  async show(req: Request, res: Response) {
    const { product_id } = req.params;
    const product = await productGetByIdService(product_id);
    return res.status(200).json({ product });
  }

  async delete(req: Request, res: Response) {
    const { product_id } = req.params;
    const toBeDeleted = await productDeleteService(product_id);
    return res
      .status(200)
      .json({ message: "product deleted", deletedProduct: toBeDeleted });
  }
}
