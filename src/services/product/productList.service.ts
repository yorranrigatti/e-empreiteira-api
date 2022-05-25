import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProducts.entity";

const productListService = async () => {
  const productRepo = AppDataSource.getRepository(Product);
  const stockProdRepo = AppDataSource.getRepository(StockProducts);

  const products = productRepo.find();
  let prodsNStock: Object[] = [];

  (await products).forEach(async (product) => {
    let stockProd = await stockProdRepo.findOne({
      where: { id: product.stockProduct.id },
    });

    prodsNStock = [...prodsNStock, product, { stock_info: stockProd }];
  });

  return prodsNStock;
};

export default productListService;
