import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import Emploee from "../../entities/emploee";
import { AppError } from "../../errors/appError";

export default class DeleteEmploeeService {
  async execute(id: string): Promise<DeleteResult> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);

    const emploee = await emploeeRepository.findOne({ where: { id } });
    
    if (!emploee) {
      throw new AppError("Client not found", 404);
    }

    return await emploeeRepository.delete(id);
  }
}
