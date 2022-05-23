import { AppDataSource } from "../../data-source";
import Adress from "../../entities/address";

export default class listAdressService {
  async execute(): Promise<Adress[]> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = await adressRepository.find();

    return adress;
  }
}
