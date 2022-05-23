import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerCreate, IOwnerReturn } from "../../interfaces/owner";

import bcrypt from "bcryptjs";

const createOwnerService = async ({
  name,
  lastName,
  cellphone,
  cpf,
  email,
  password,
}: IOwnerCreate) => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owner = new CompanyOwner();
  owner.name = name;
  owner.lastName = lastName;
  owner.email = email;
  owner.password = await bcrypt.hash(password, 10);
  owner.cpf = cpf;
  owner.cellphone = cellphone;

  companyOwnerRepository.create(owner);
  companyOwnerRepository.save(owner);

  const newOwner: IOwnerReturn = { ...owner };
  delete newOwner.password;

  return newOwner;
};

export default createOwnerService;
