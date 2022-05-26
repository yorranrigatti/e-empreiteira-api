import { ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProduct.entity";
import { AppError } from "../../errors/appError";

const productCreateService = async (
  name: string,
  company_id: string,
  retail_price: number,
  wholesale_price: number,
  category: string,
  brand: string,
  qty_available: number
) => {
  const productRepo = AppDataSource.getRepository(Product);
  const stockProdRepo = AppDataSource.getRepository(StockProducts);

  const productAlreadyExists = await productRepo.findOne({
    where: { name: ILike(name), company_id },
  });

  if (productAlreadyExists) {
    throw new AppError("product already exists", 409);
  }

  const prodStock = new StockProducts();
  prodStock.retail_price = retail_price;
  prodStock.wholesale_price = wholesale_price;
  prodStock.category = category;
  prodStock.brand = brand;
  prodStock.qty_available = qty_available;

  const product = new Product();
  product.name = name;
  product.company_id = company_id;

  stockProdRepo.create(prodStock);
  await stockProdRepo.save(prodStock);
  productRepo.create(product);
  await productRepo.save(product);
  return { product, stock_info: prodStock };
};

export default productCreateService;
