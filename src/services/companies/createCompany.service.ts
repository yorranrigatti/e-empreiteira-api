import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entity";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { AppError } from "../../errors/appError";
import { ICompanyCreate } from "../../interfaces/companies";

const createCompanyService = async ({
  name,
  cnpj,
  owner_id,
  type,
  address_id,
}: ICompanyCreate) => {
  try {
    const companiesRepository = AppDataSource.getRepository(Companies);
    const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

    const owner = await companyOwnerRepository.findOne({
      where: { id: owner_id },
    });

    const company = new Companies();
    company.name = name;
    company.cnpj = Number(cnpj);
    company.type = type;
    company.owner_id = owner_id;
    company.address_id = address_id;

    companiesRepository.create(company);
    await companiesRepository.save(company);

    owner?.companies.push(company);

    companyOwnerRepository.save(owner!);

    return company;
  } catch (err: any) {
    throw new AppError(err, 500);
  }
};

export default createCompanyService;
