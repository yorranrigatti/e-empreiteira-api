import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { ICompanyCreate } from "../../interfaces/companies";

const createCompanyService = async ({
  name,
  cnpj,
  owner_id,
  type,
  addess_id,
}: ICompanyCreate) => {
  const companiesRepository = AppDataSource.getRepository(Companies);

  const company = new Companies();
  company.name = name;
  company.cnpj = Number(cnpj);
  company.type = type;
  company.owner_id = owner_id;
  company.address_id = addess_id;

  companiesRepository.create(company);
  await companiesRepository.save(company);

  return company;
};

export default createCompanyService;
