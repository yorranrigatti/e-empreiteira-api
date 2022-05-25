import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import StockProducts from "../../entities/stockProducts.entity";
import { AppError } from "../../errors/appError";

const cartRemoveProductService = async (
  client_id: string,
  product_id: string
) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const cartRepo = AppDataSource.getRepository(Cart);
  const stockRepo = AppDataSource.getRepository(StockProducts);

  const client = await clientRepo.findOne({ where: { id: client_id } });

  if (!client) {
    throw new AppError("client not found", 404);
  }

  const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

  if (cart) {
    if (!cart.products.find((prod) => prod.id === product_id)) {
      throw new AppError("product not in the cart", 404);
    }

    const prodToBeRemoved = cart.products.find(
      (prod) => prod.id === product_id
    );

    const stockProd = await stockRepo.findOne({
      where: { id: prodToBeRemoved?.stockProduct.id },
    });

    stockProd && (cart.subtotal -= stockProd?.sale_price);

    await cartRepo.save(cart);

    return;
  }
};

export default cartRemoveProductService;
