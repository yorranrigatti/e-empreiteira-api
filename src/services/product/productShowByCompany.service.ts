import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { AppError } from "../../errors/appError";

const productShowByCompanyService = async (company_id: string) => {
  const companyRepo = AppDataSource.getRepository(Companies);

  const company = await companyRepo.findOne({
    where: {
      id: company_id,
    },
  });

  if (!company) {
    throw new AppError("invalid company id", 400);
  }

  const products = company?.products;
  return products;
};

export default productShowByCompanyService;
