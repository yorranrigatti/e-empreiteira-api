import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { AppError } from "../../errors/appError";

const listOneOwnerService = async (id: string) => {
  try {
    const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

    const owner = await companyOwnerRepository.findOne({
      where: { id },
    });

    return owner;
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
};

export default listOneOwnerService;
