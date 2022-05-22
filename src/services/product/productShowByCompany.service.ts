import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productShowByCompanyService = async (company_id: number) => {
  const productRepo = AppDataSource.getRepository(Product);

  const products = productRepo.find({ where: { company_id } });

  if (!products) {
    throw new AppError(404, "product not found");
  }

  return products;
};

export default productShowByCompanyService;
