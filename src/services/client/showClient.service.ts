import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import { IClientReturn } from "../../interfaces/clientInterfaces";

export default class ShowClientService {
  async execute(id: string) {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new AppError("Client not found", 404);
    }

    const result: IClientReturn = { ...client };
    delete result.password;

    return result;
  }
}
