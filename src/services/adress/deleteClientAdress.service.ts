import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

export default class deleteClientAdressService {
  async execute(id: string) {
    const clientRepository = AppDataSource.getRepository(Client);
    const adressRepository = AppDataSource.getRepository(Adress);

    const client = await clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new AppError("Client not found", 404);
    }
    
    return await adressRepository.delete(client.adress.id)
  }
}
