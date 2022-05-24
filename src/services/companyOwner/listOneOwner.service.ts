import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerReturn } from "../../interfaces/owner";

const listOneOwnerService = async (id: string) => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owner = await companyOwnerRepository.findOne({
    where: { id },
  });

  return owner;
};

export default listOneOwnerService;
