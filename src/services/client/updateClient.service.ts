import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import { IUpdateClient } from "../../interfaces/clientInterfaces";

export default class UpdateClientService {
  async execute({
    id,
    name,
    lastName,
    email,
  }: IUpdateClient): Promise<Client> {
      const clientRepository = AppDataSource.getRepository(Client)

      const client = await clientRepository.findOne({ where: { id } })
      
      if (!client) {
          throw new AppError("client not found", 404)
      }

      name ? (client.name = name) : client.name
      lastName ? (client.lastName = lastName) : client.lastName
      email ? (client.email = email) : client.email

      return clientRepository.save(client)
  }
}
