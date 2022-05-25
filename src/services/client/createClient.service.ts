import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import {
  IClientReturn,
  ICreateClient,
} from "../../interfaces/clientInterfaces";
import { hash } from "bcryptjs";

export default class CreateClientService {
  async execute({
    name,
    lastName,
    email,
    password,
    cellphone,
  }: ICreateClient): Promise<IClientReturn> {
    const clientRepository = AppDataSource.getRepository(Client);

    const checkClientExists = await clientRepository.findOne({
      where: {
        email,
      },
    });

    if (checkClientExists) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hash(password, 8);

    const client = clientRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      cellphone,
    });

    await clientRepository.save(client);

    const clientReturned: IClientReturn = { ...client };
    delete clientReturned.password;

    return clientReturned;
  }
}
