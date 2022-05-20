import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import { ICreateAdress } from "../../interfaces/clientInterfaces";

export default class CreateAdressService {
  async execute({
    country,
    state,
    city,
    street,
    number,
    complement,
    postalcode,
  }: ICreateAdress): Promise<Adress> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = adressRepository.create({
      country,
      state,
      city,
      street,
      number,
      complement,
      postalcode,
    });

    return await adressRepository.save(adress);
  }
}
