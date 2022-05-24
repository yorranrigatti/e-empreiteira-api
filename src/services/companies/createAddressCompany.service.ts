import { AppDataSource } from "../../data-source";
import Adress from "../../entities/adress";
import { Companies } from "../../entities/companies.entity";
import { AppError } from "../../errors/appError";
import { ISetClientAdress } from "../../interfaces/clientInterfaces";

const createAddressCompanyService = async ({
  id,
  city,
  country,
  number,
  postalcode,
  state,
  street,
  complement,
}: ISetClientAdress) => {
  try {
    const adressRepository = AppDataSource.getRepository(Adress);
    const companiesRepository = AppDataSource.getRepository(Companies);

    const company = await companiesRepository.findOne({ where: { id } });

    const adress = new Adress();
    adress.city = city;
    adress.country = country;
    adress.number = Number(number);
    adress.postalcode = Number(postalcode);
    adress.state = state;
    adress.street = street;
    adress.complement = complement!;

    adressRepository.create(adress);
    await adressRepository.save(adress);

    company!.address = adress;
    await companiesRepository.save(company!);

    return adress;
  } catch (err: any) {
    throw new AppError(err, 500);
  }
};

export default createAddressCompanyService;
