import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";

export default class ListClientsService {
  async execute(): Promise<Client[]> {
    const clientRepository = AppDataSource.getRepository(Client);

    const clients = await clientRepository.find();

    return clients;
  }
}
