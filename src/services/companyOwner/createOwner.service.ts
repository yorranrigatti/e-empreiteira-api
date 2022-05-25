import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerCreate, IOwnerReturn } from "../../interfaces/owner";

import bcrypt from "bcryptjs";
import { AppError } from "../../errors/appError";

const createOwnerService = async ({
  name,
  lastName,
  cellphone,
  cpf,
  email,
  password,
}: IOwnerCreate) => {
  try {
    const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

    const owner = new CompanyOwner();
    owner.name = name;
    owner.lastName = lastName;
    owner.email = email;
    owner.password = await bcrypt.hash(password, 10);
    owner.cpf = cpf;
    owner.cellphone = cellphone;

    companyOwnerRepository.create(owner);
    await companyOwnerRepository.save(owner);
    return owner;
  } catch (err: any) {
    if (
      err.message ===
      'duplicate key value violates unique constraint "UQ_2e71e930627351c26207d1a299d"'
    ) {
      throw new AppError("Email already exists", 409);
    } else if (
      err.message ===
      'duplicate key value violates unique constraint "UQ_fccef7ad26ce72df7926a421ef6"'
    ) {
      throw new AppError("Cpf already exists", 409);
    } else if (
      err.message ===
      'duplicate key value violates unique constraint "UQ_0e8bc99ff4fa2e5ec94dfe5e74e"'
    ) {
      throw new AppError("cellphone already exists", 409);
    } else {
      throw new AppError(err.message, 500);
    }
  }
};

export default createOwnerService;
