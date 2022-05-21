import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productDeleteService = async (product_id: string) => {
  const productRepo = AppDataSource.getRepository(Product);

  const product = await productRepo.findOne({ where: { id: product_id } });

  if (!product) {
    throw new AppError(404, "product not found");
  }

  await productRepo.delete(product_id);

  return product;
};

export default productDeleteService;
