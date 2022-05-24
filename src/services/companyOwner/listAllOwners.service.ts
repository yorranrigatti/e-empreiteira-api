import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerReturn } from "../../interfaces/owner";

const listAllOwnersService = async () => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owners = await companyOwnerRepository.find();

  return owners;
};

export default listAllOwnersService;
