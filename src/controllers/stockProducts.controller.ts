import { Request, Response } from "express";

import CreateStockProductService from "../services/stock_products/addProduct.service";
import DeleteStockProductService from "../services/stock_products/deleteStockProduct.service";
import ListStockProductsService from "../services/stock_products/listStockProduct.service";
import ShowStockProductService from "../services/stock_products/showStockProduct.service";
import UpdateStockProductService from "../services/stock_products/updateStockProduct.service";

export default class StockProductsController {
  static async store(req: Request, res: Response) {
    const { product_id } = req.params;

    const { sale_price, cost_price, category, brand, expiration_date } =
      req.body;

    const addStock = new CreateStockProductService();

    const stockProduct = await addStock.execute({
      product_id,
      sale_price,
      cost_price,
      category,
      brand,
      expiration_date,
    });

    return res.status(201).json(stockProduct);
  }

  static async index(req: Request, res: Response) {
    const listStock = new ListStockProductsService();

    const stockProducts = await listStock.execute();

    return res.json(stockProducts);
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showStock = new ShowStockProductService();

    const stockProduct = await showStock.execute(id);

    return res.json(stockProduct);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { sale_price, cost_price, category, brand, expiration_date } = req.body;

    const updateStock = new UpdateStockProductService();

    const updated = await updateStock.execute({
      id,
      sale_price,
      cost_price,
      category,
      brand,
      expiration_date
    });

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteStock = new DeleteStockProductService();

    const deleted = await deleteStock.execute(id);

    return res.json(deleted);
  }
}
