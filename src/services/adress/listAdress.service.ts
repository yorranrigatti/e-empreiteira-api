import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";

export default class listAdressService {
  async execute(): Promise<Adress[]> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = await adressRepository.find();

    return adress;
  }
}
