import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import { ICreateClient } from "../../interfaces/clientInterfaces";
import { hash } from "bcryptjs";

export default class CreateClientService {
  async execute({
    name,
    lastName,
    email,
    password,
  }: ICreateClient): Promise<Client> {
    const clientRepository = AppDataSource.getRepository(Client);

    const checkClientExists = await clientRepository.findOne({
      where: {
        email,
      },
    });

    if (checkClientExists) {
      throw new AppError("Email already exists", 401);
    }

    const hashedPassword = await hash(password, 8);

    const client = clientRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await clientRepository.save(client);

    return client;
  }
}
