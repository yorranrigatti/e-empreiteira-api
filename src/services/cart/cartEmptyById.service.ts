import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

const cartEmptyByIdService = async (client_id?: string, cart_id?: string) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const cartRepo = AppDataSource.getRepository(Cart);

  if (client_id) {
    const client = await clientRepo.findOne({ where: { id: client_id } });

    if (!client) {
      throw new AppError("client not found", 404);
    }

    const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

    if (cart) {
      cart && (cart.productCart = []);
      await cartRepo.save(cart);
      return cart;
    }
  } else if (cart_id) {
    const cart = await cartRepo.findOne({ where: { id: cart_id } });
    if (!cart) {
      throw new AppError("cart not found", 404);
    }

    cart && (cart.productCart = []);
    await cartRepo.save(cart);
    return cart;
  }
};

export default cartEmptyByIdService;
