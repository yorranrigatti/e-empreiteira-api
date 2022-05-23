import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

export default class ShowStockProductService {
  async execute(id: string): Promise<StockProducts | null> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);

    const showStock = await stockProductsRepository.findOne({ where: { id } });

    if (!showStock) {
      throw new AppError("Stock not found", 404);
    }

    return showStock;
  }
}
