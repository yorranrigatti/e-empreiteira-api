import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";

const deleteCompanyService = async (id: string) => {
  const companiesRepository = AppDataSource.getRepository(Companies);

  return await companiesRepository.delete(id);
};

export default deleteCompanyService;
