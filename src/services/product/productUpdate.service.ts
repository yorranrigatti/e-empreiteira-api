import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

const productUpdateService = async (
  product_id: string,
  name: string,
  retail_price: number,
  wholesale_price: number,
  category: string,
  brand: string,
  qty_available: number
) => {
  const productRepo = AppDataSource.getRepository(Product);
  const stockRepo = AppDataSource.getRepository(StockProducts);

  const product = await productRepo.findOne({ where: { id: product_id } });

  if (!product) {
    throw new AppError("product not found", 404);
  }

  const stockProd = await stockRepo.findOne({
    where: { id: product.stockProduct.id },
  });

  product.name = name;
  if (
    stockProd?.sale_price &&
    stockProd.cost_price &&
    stockProd.category &&
    stockProd.brand &&
    stockProd.qty_available
  ) {
    retail_price && (stockProd.sale_price = retail_price);
    wholesale_price && (stockProd.cost_price = wholesale_price);
    category && (stockProd.category = category);
    brand && (stockProd.brand = brand);
    qty_available && (stockProd.qty_available = qty_available);
  }

  await productRepo.save(product);

  const updatedFields = {
    ...(name && { name }),
    ...(retail_price && { sale_price: retail_price }),
    ...(wholesale_price && { cost_price: wholesale_price }),
    ...(category && { category }),
    ...(brand && { brand }),
    ...(qty_available && { qty_available }),
  };

  return updatedFields;
};

export default productUpdateService;

/* 
  CONDITIONAL OBJECT VALUES

  const exampleObj: Object = {
    key1 : value1,
    key2: value2,
    ...(exampleCondition && {exampleKey: exampleValue }) <==
  }
*/
