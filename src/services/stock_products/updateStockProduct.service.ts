import { AppDataSource } from "../../data-source";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";
import { IStockProductUpdate } from "../../interfaces/stock";

export default class UpdateStockProductService {
  async execute({
    id,
    sale_price,
    cost_price,
    category,
    mark,
    qty_available,
  }: IStockProductUpdate): Promise<StockProducts> {
    const stockProductsRepository = AppDataSource.getRepository(StockProducts);

    const stockProduct = await stockProductsRepository.findOne({
      where: { id },
    });

    if (!stockProduct) {
      throw new AppError("Stock not found", 404);
    }

    sale_price
      ? (stockProduct.sale_price = sale_price)
      : stockProduct.sale_price;
    cost_price
      ? (stockProduct.cost_price = cost_price)
      : stockProduct.cost_price;
    category ? (stockProduct.category = category) : stockProduct.category;
    mark ? (stockProduct.mark = mark) : stockProduct.mark;
    qty_available
      ? (stockProduct.qty_available = qty_available)
      : stockProduct.qty_available;

    return await stockProductsRepository.save(stockProduct);
  }
}
