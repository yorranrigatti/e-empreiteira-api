import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";

const cartEmptyService = async (client_id: string) => {
  const clientRepo = AppDataSource.getRepository(Client);

  const cartRepo = AppDataSource.getRepository(Cart);

  const client = await clientRepo.findOne({ where: { id: client_id } });

  const cart = await cartRepo.findOne({ where: { id: client?.cart.id } });

  if (cart && client) {
    cart.productCart = [];
    cart.subtotal = 0;
    await cartRepo.save(cart);
    return cart;
  }
};

export default cartEmptyService;
