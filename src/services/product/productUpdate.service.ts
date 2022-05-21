import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productUpdateService = async (product_id: string, newName: string) => {
  const productRepo = AppDataSource.getRepository(Product);

  const product = await productRepo.findOne({ where: { id: product_id } });

  if (!product) {
    throw new AppError(404, "product not found");
  }

  product.name = newName;
  await productRepo.save(product);

  const updatedFields = {
    name: newName,
  };

  return updatedFields;
};

export default productUpdateService;
