import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const productListService = async () => {
  const productRepo = AppDataSource.getRepository(Product);

  const products = productRepo.find();

  return products;
};

export default productListService;
