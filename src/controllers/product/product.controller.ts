import { Request, Response } from "express";
import productCreateService from "../../services/product/productCreate.service";
export default class ProductController {
  async store(req: Request, res: Response) {
    const { name, company_id } = req.body;
    const product = await productCreateService(name, company_id);
    return res.status(201).json({ message: "product registered", product });
  }
}
