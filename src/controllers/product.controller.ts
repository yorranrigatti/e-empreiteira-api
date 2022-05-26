import { Request, Response } from "express";
import productCreateService from "../services/product/productCreate.service";
import productDeleteService from "../services/product/productDelete.service";
import productGetByIdService from "../services/product/productgetById.service";
import productListService from "../services/product/productList.service";
import productShowByCompanyService from "../services/product/productShowByCompany.service";
import productUpdateService from "../services/product/productUpdate.service";
export default class ProductController {
  async store(req: Request, res: Response) {
    const {
      name,
      company_id,
      retail_price,
      wholesale_price,
      category,
      brand,
      qty_available,
    } = req.body;
    const product = await productCreateService(
      name,
      company_id,
      retail_price,
      wholesale_price,
      category,
      brand,
      qty_available
    );
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

  async showByCompany(req: Request, res: Response) {
    const { company_id } = req.params;
    const products = await productShowByCompanyService(Number(company_id));
    return res.status(200).json(products);
  }

  async update(req: Request, res: Response) {
    const { product_id } = req.params;
    const { name } = req.body;
    const updatedFields = await productUpdateService(product_id, name);
    return res.status(200).json({ message: "product updated", updatedFields });
  }

  async delete(req: Request, res: Response) {
    const { product_id } = req.params;
    const toBeDeleted = await productDeleteService(product_id);
    return res
      .status(200)
      .json({ message: "product deleted", deletedProduct: toBeDeleted });
  }
}
