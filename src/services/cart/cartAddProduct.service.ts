import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import { Product } from "../../entities/product.entity";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

const cartAddProductService = async (product_id: string, client_id: string) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const cartRepo = AppDataSource.getRepository(Cart);
  const productRepo = AppDataSource.getRepository(Product);
  const stockRepo = AppDataSource.getRepository(StockProducts);

  const client = await clientRepo.findOne({ where: { id: client_id } });

  if (!client) {
    throw new AppError("no user logon/user not found", 401);
  }

  const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

  const product = await productRepo.findOne({ where: { id: product_id } });

  if (!product) {
    throw new AppError("product not found", 404);
  }

  const stockProd = await stockRepo.findOne({
    where: { id: product.stockProduct.id },
  });

  if (cart && product && stockProd) {
    if (cart.products.find((prod) => prod.id === product.id)) {
      throw new AppError("product already in cart", 409);
    }
    cart.products = [...cart.products, product];
    cart.subtotal += stockProd?.sale_price;
    cart.quantity_total_itens = cart.products.length;
    await cartRepo.save(cart);
    return cart;
  }
};

export default cartAddProductService;
