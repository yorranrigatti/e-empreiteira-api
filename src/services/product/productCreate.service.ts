import { ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";

const productCreateService = async (name: string, company_id: string) => {
  const productRepo = AppDataSource.getRepository(Product);
  const companiesRepo = AppDataSource.getRepository(Companies);

  const productAlreadyExists = await productRepo.findOne({
    where: { name: ILike(name), company_id },
  });

  if (productAlreadyExists) {
    throw new AppError("product already exists", 409);
  }

  const company = await companiesRepo.findOne({ where: { id: company_id } });

  const product = new Product();
  product.name = name;
  product.company_id = company_id;

  company!.products = [...company!.products, product];

  productRepo.create(product);
  await productRepo.save(product);
  await companiesRepo.save(company!);
  
  return product;
};

export default productCreateService;
