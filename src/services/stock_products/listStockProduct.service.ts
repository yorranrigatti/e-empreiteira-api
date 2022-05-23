import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";

export default class ListStockProductsService {
  async execute(): Promise<StockProducts[]> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);

    const stockProducts = await stockProductsRepository.find();

    return stockProducts;
  }
}
