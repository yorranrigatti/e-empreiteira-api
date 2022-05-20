import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import { AppError } from "../../errors/appError";
import { IUpdateAdress } from "../../interfaces/clientInterfaces";

export default class UpdateAdressService {
  async execute({
    id,
    country,
    state,
    city,
    street,
    number,
    complement,
    postalcode,
  }: IUpdateAdress): Promise<Adress> {
    const adressRepository = AppDataSource.getRepository(Adress);

    const adress = await adressRepository.findOne({ where: { id } });

    if (!adress) {
      throw new AppError("Adress not found", 404);
    }

    country ? (adress.country = country) : adress.country;
    state ? (adress.state = state) : adress.state;
    city ? (adress.city = city) : adress.city;
    street ? (adress.street = street) : adress.street;
    number ? (adress.number = number) : adress.number;
    complement ? (adress.complement = complement) : adress.complement;
    postalcode ? (adress.postalcode = postalcode) : adress.postalcode;

    return await adressRepository.save(adress);
  }
}
