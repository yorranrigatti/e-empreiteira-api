import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";

const deleteOwnerService = async (id: string) => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  return await companyOwnerRepository.delete(id);
};

export default deleteOwnerService;
