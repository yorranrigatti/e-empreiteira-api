import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ICreateEmploee } from "../../interfaces/emploee";
import { hash } from "bcryptjs";
import Emploee from "../../entities/emploee";
import { Companies } from "../../entities/companies.entity";

export default class CreateEmploeeService {
  async execute({
    name,
    lastName,
    email,
    password,
    cellphone,
    cpf,
    role,
    company_id,
  }: ICreateEmploee): Promise<Emploee> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);
    const companyRepository = AppDataSource.getRepository(Companies);

    const checkEmploeeExists = await emploeeRepository.findOne({
      where: {
        email,
      },
    });

    if (checkEmploeeExists) {
      throw new AppError("Email already exists", 400);
    }

    const company = await companyRepository.findOne({
      where: { id: company_id },
    });

    const hashedPassword = await hash(password, 8);

    const emploee = emploeeRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      cellphone,
      cpf,
      role,
      company_id,
    });

    await emploeeRepository.save(emploee);

    company!.emploees.push(emploee);

    await companyRepository.save(company!);

    return emploee;
  }
}
