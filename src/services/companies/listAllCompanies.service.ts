import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";

const listAllCompaniesService = async () => {
  const companiesRepository = AppDataSource.getRepository(Companies);

  const companies = companiesRepository.find();

  return companies;
};

export default listAllCompaniesService;
