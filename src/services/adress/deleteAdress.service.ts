import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import Adress from "../../entities/address";
import { AppError } from "../../errors/appError";

export default class DeleteAdressService {
  async execute(id: string): Promise<DeleteResult> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = await adressRepository.findOne({ where: { id } });

    if (!adress) {
      throw new AppError("Adress not found", 404);
    }

    return await adressRepository.delete(id);
  }
}
