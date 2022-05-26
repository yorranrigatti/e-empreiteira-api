import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { ICompanyUpdate } from "../../interfaces/companies";

const updateCompanyService = async (
  id: string,
  { name, cnpj, type }: ICompanyUpdate
) => {
  const companiesRepository = AppDataSource.getRepository(Companies);

  const company = await companiesRepository.findOne({ where: { id } });

  name ? (company!.name = name) : company!.name;
  cnpj ? (company!.cnpj = cnpj) : company!.cnpj;
  type ? (company!.type = type) : company!.type;

  return companiesRepository.save(company!);
};

export default updateCompanyService;
