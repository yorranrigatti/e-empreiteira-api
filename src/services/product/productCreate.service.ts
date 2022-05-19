import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productCreateService = async (name: string, company_id: number) => {
  const productRepo = AppDataSource.getRepository(Product);

  const productAlreadyExists = await productRepo.findOne({
    where: { name, company_id },
  });

  if (productAlreadyExists) {
    throw new AppError(409, "product already exists");
  }

  const product = new Product();
  product.name = name;
  product.company_id = company_id;

  productRepo.create(product);
  await productRepo.save(product);
  return product;
};

export default productCreateService;
