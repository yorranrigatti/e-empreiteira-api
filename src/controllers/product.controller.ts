import { Request, Response } from "express";
import productCreateService from "../services/product/productCreate.service";
import productDeleteService from "../services/product/productDelete.service";
import productGetByIdService from "../services/product/productgetById.service";
import productListService from "../services/product/productList.service";
import productShowByCompanyService from "../services/product/productShowByCompany.service";
import productUpdateService from "../services/product/productUpdate.service";
export default class ProductController {
  async store(req: Request, res: Response) {
    const { name, company_id } = req.body;
    const product = await productCreateService(name, company_id);
    return res.status(201).json(product);
  }

  async index(req: Request, res: Response) {
    const products = await productListService();
    return res.json(products);
  }

  async show(req: Request, res: Response) {
    const { product_id } = req.params;
    const product = await productGetByIdService(product_id);
    return res.json(product);
  }

  async showByCompany(req: Request, res: Response) {
    const { company_id } = req.params;
    const products = await productShowByCompanyService(company_id);
    return res.json(products);
  }

  async update(req: Request, res: Response) {
    const { product_id } = req.params;
    const { name } = req.body;
    const updatedFields = await productUpdateService(product_id, name);
    return res.json({ message: "product updated", updatedFields });
  }

  async delete(req: Request, res: Response) {
    const { product_id } = req.params;
    const toBeDeleted = await productDeleteService(product_id);
    return res.status(204).json();
  }
}
