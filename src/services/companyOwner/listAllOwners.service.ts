import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { AppError } from "../../errors/appError";

const listAllOwnersService = async () => {
  try {
    const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

    const owners = await companyOwnerRepository.find();

    return owners;
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
};

export default listAllOwnersService;
