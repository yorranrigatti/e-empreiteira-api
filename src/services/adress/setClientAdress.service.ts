import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";
import { IUpdateAdress } from "../../interfaces/clientInterfaces";

export default class setClientAdressService {
  async execute({
    id,
    country,
    state,
    city,
    street,
    number,
    complement,
    postalcode,
  }: IUpdateAdress): Promise<Client> {
    const clientRepository = AppDataSource.getRepository(Client);
    const adressRepository = AppDataSource.getRepository(Adress);

    const client = await clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new AppError("Client not found", 404);
    }

    const adress = new Adress();

    adress.country = country;
    adress.state = state;
    adress.city = city;
    adress.street = street;
    adress.number = number;
    adress.complement = complement!;
    adress.postalcode = postalcode;

    const createdAdress = adressRepository.create(adress);

    client.adress = adress

    await adressRepository.save(adress);
    await clientRepository.save(client);

    return client;
  }
}
