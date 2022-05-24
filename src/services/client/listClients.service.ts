import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { IClientReturn } from "../../interfaces/clientInterfaces";

export default class ListClientsService {
  async execute(): Promise<IClientReturn[]> {
    const clientRepository = AppDataSource.getRepository(Client);

    const clients = await clientRepository.find();

    const result = clients.map((client: IClientReturn) => {
      delete client.password;
      return client;
    });

    return result;
  }
}
