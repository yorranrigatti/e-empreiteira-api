import { AppDataSource } from "../../data-source";
import Emploee from "../../entities/emploee";

export default class ListEmploeesService {
  async execute(): Promise<Emploee[]> {
    const emploeeRepository = AppDataSource.getRepository(Emploee);

    const emploees = await emploeeRepository.find();

    return emploees;
  }
}
