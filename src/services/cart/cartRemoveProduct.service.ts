import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

const cartRemoveProductService = async (
  client_id: string,
  product_id: string
) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const cartRepo = AppDataSource.getRepository(Cart);

  const client = await clientRepo.findOne({ where: { id: client_id } });

  const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

  if (cart) {
    if (!cart.productCart.find((prod) => prod.id === product_id)) {
      throw new AppError("product not in the cart", 404);
    }

    const removedProd = cart.productCart.find((prod) => prod.id === product_id);
    cart.productCart = cart.productCart.filter(
      (prod) => prod.id !== product_id
    );
    await cartRepo.save(cart);

    return removedProd;
  }
};

export default cartRemoveProductService;
