import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerReturn } from "../../interfaces/owner";

const listAllOwnersService = async () => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owners = await companyOwnerRepository.find();

  const result = owners.map((owner: IOwnerReturn) => {
    delete owner.password;
    return owner;
  });

  return result;
};

export default listAllOwnersService;
