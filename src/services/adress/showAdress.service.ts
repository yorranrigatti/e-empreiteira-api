import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import { AppError } from "../../errors/appError";

export default class ShowAdressService {
  async execute(id: string): Promise<Adress> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = await adressRepository.findOne({ where: { id } });

    if (!adress) {
      throw new AppError("Adress not found", 404);
    }

    return adress;
  }
}
