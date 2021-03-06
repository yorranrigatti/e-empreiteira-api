import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { Companies } from "../../entities/companies.entity";

const listOneCompanyService = async (id: string) => {
  const companiesRepository = AppDataSource.getRepository(Companies);

  const company = companiesRepository.findOne({ where: { id } });

  return company;
};

export default listOneCompanyService;
