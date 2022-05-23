import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";
import { IStockProductCreate } from "../../interfaces/stock/index";

import { AppError } from "../../errors/appError";

export default class CreateStockProductService {
  async execute({
    product_id,
    sale_price,
    cost_price,
    category,
    mark,
  }: IStockProductCreate): Promise<StockProducts> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);

    const checkProductExists = await stockProductsRepository.findOne({
      where: {
        product_id,
      },
    });

    if (checkProductExists) {
      throw new AppError("Product already add in stock", 400);
    }

    const stockProduct = stockProductsRepository.create({
      product_id,
      sale_price,
      cost_price,
      category,
      mark,
    });

    await stockProductsRepository.save(stockProduct);

    return stockProduct;
  }
}
