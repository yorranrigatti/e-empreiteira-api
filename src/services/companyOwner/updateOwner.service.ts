import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerUpdate } from "../../interfaces/owner";
import bcrypt from "bcrypt";

const updateOwnerService = async (
  id: string,
  { name, lastName, email, password, cpf, cellphone }: IOwnerUpdate
) => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owner = await companyOwnerRepository.findOne({
    where: { id },
  });

  name ? (owner!.name = name) : name;
  lastName ? (owner!.lastName = lastName) : lastName;
  email ? (owner!.email = email) : email;
  password ? (owner!.password = await bcrypt.hash(password, 10)) : password;
  cpf ? (owner!.cpf = cpf) : cpf;
  cellphone ? (owner!.cellphone = cellphone) : cellphone;

  return companyOwnerRepository.save(owner!);
};

export default updateOwnerService;
