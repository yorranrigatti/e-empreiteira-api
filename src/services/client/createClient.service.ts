import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import { ICreateClient } from "../../interfaces/clientInterfaces";
import { hash } from "bcryptjs";
import { Cart } from "../../entities/cart.entity";

export default class CreateClientService {
  async execute({
    name,
    lastName,
    email,
    password,
    cellphone,
  }: ICreateClient): Promise<Client> {
    const clientRepository = AppDataSource.getRepository(Client);
    const cartRepository = AppDataSource.getRepository(Cart);

    const checkClientExists = await clientRepository.findOne({
      where: {
        email,
      },
    });

    if (checkClientExists) {
      throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await hash(password, 8);

    const cart = new Cart();
    cart.subtotal = 0;
    cart.products = [];
    cartRepository.create(cart);
    await cartRepository.save(cart);

    const client = clientRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      cellphone,
      cart,
    });

    await clientRepository.save(client);

    return client;
  }
}
