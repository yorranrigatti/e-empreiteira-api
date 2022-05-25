import { AppDataSource } from "../../data-source";
import Emploee from "../../entities/emploee";
import { AppError } from "../../errors/appError";
import { IUpdateEmploee } from "../../interfaces/emploee";

export default class UpdateEmploeeService {
  async execute({
    id,
    name,
    lastName,
    email,
    cellphone,
    cpf,
    role
  }: IUpdateEmploee): Promise<Emploee> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);

    const emploee = await emploeeRepository.findOne({ where: { id } });

    if (!emploee) {
      throw new AppError("client not found", 404);
    }

    name ? (emploee.name = name) : emploee.name;
    lastName ? (emploee.lastName = lastName) : emploee.lastName;
    email ? (emploee.email = email) : emploee.email;
    cellphone ? (emploee.cellphone = cellphone) : emploee.cellphone;
    cpf ? (emploee.cpf = cpf) : emploee.cpf;
    role ? (emploee.role = role) : emploee.role;

    return await emploeeRepository.save(emploee);
  }
}
