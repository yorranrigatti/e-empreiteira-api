import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";
import { IStockProductCreate } from "../../interfaces/stock/index";

import { AppError } from "../../errors/appError";
import { Product } from "../../entities/product.entity";

export default class CreateStockProductService {
  async execute({
    product_id,
    sale_price,
    cost_price,
    category,
    brand,
    expiration_date,
  }: IStockProductCreate): Promise<StockProducts> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    const stockProduct = stockProductsRepository.create({
      product_id,
      sale_price,
      cost_price,
      category,
      brand,
      expiration_date,
    });

    product!.stock = [...product!.stock, stockProduct];

    await stockProductsRepository.save(stockProduct);
    await productRepository.save(product!);

    return stockProduct;
  }
}
