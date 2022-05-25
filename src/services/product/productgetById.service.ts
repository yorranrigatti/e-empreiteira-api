import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

const productGetByIdService = async (product_id: string) => {
  const productRepo = AppDataSource.getRepository(Product);
  const stockProdRepo = AppDataSource.getRepository(StockProducts);

  const product = await productRepo.findOne({ where: { id: product_id } });
  const stockProd = await stockProdRepo.findOne({
    where: { id: product?.stockProduct.id },
  });

  if (!product) {
    throw new AppError("product not found", 404);
  }

  return { product, stock_info: stockProd };
};

export default productGetByIdService;
