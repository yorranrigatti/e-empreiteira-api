import { AppDataSource } from "../../data-source";
import Emploee from "../../entities/emploee";
import { AppError } from "../../errors/appError";

export default class ShowEmploeeService {
  async execute(id: string): Promise<Emploee | null> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);

    const emploee = await emploeeRepository.findOne({ where: { id } });

      if (!emploee) {
          throw new AppError("Emploee not found", 404)
      }

    return emploee;
  }
}
