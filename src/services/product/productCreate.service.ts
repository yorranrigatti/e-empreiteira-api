import { ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

const productCreateService = async (
  name: string,
  company_id: string,
  retail_price: number,
  wholesale_price: number,
  category: string,
  brand: string,
  qty_available: number = 0
) => {
  const productRepo = AppDataSource.getRepository(Product);
  const stockRepo = AppDataSource.getRepository(StockProducts);
  const companyRepo = AppDataSource.getRepository(Companies);

  const company = await companyRepo.findOne({
    where: {
      id: company_id,
    },
  });

  if (!company) {
    throw new AppError("invalid company id", 400);
  }

  const productAlreadyExists = await productRepo.findOne({
    where: { name: ILike(name) },
  });

  if (productAlreadyExists) {
    throw new AppError("product already exists", 409);
  }

  const product = new Product();
  product.name = name;

  const stockProd = new StockProducts();
  stockProd.category = category;
  stockProd.cost_price = wholesale_price;
  stockProd.sale_price = retail_price;
  stockProd.brand = brand;
  stockProd.qty_available = qty_available;
  stockRepo.create(stockProd);
  await stockRepo.save(stockProd);

  await productRepo.save(product);
  return { product, stock_info: stockProd };
};

export default productCreateService;
