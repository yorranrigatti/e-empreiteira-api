import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

export default class DeleteStockProductService {
  async execute(id: string): Promise<DeleteResult> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);

    const stockProduct = await stockProductsRepository.findOne({
      where: { id },
    });

    if (!stockProduct) {
      throw new AppError("Stock not found", 404);
    }

    return await stockProductsRepository.delete(id);
  }
}
