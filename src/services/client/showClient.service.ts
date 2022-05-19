import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

export default class ShowClientService {
  async execute(id: string): Promise<Client | null> {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOne({ where: { id } });

      if (!client) {
          throw new AppError("Client not found", 404)
      }

    return client;
  }
}
