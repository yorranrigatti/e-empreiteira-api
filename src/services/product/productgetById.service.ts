import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productGetByIdService = async (product_id: string) => {
  const productRepo = AppDataSource.getRepository(Product);

  const product = await productRepo.findOne({ where: { id: product_id } });

  if (!product) {
    throw new AppError("product not found", 404);
  }

  return product;
};

export default productGetByIdService;
