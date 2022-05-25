import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ICreateEmploee } from "../../interfaces/emploee";
import { hash } from "bcryptjs";
import Emploee from "../../entities/emploee";

export default class CreateEmploeeService {
  async execute({
    name,
    lastName,
    email,
    password,
    cellphone,
    cpf,
    role
  }: ICreateEmploee ): Promise<Emploee> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);
    
    const checkEmploeeExists = await emploeeRepository.findOne({
      where: {
        email,
      },
    });

    if (checkEmploeeExists) {
      throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await hash(password, 8);

    const emploee = emploeeRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      cellphone,
      cpf,
      role
    });

    await emploeeRepository.save(emploee);

    return emploee;
  }
}
