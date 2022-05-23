import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

const cartEmptyService = async (client_id: string) => {
  const clientRepo = AppDataSource.getRepository(Client);

  const cartRepo = AppDataSource.getRepository(Cart);

  const client = await clientRepo.findOne({ where: { id: client_id } });

  if (!client) {
    throw new AppError("client not found", 404);
  }

  const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

  if (cart && client) {
    cart.products = [];
    cart.subtotal = 0;
    await cartRepo.save(cart);
    return cart;
  }
};

export default cartEmptyService;
