import { AppDataSource } from "../../data-source";
import { Orders } from "../../entities/orders.entity";

const listAllOrdersService = async () => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  return await ordersRepository.find();
};

export default listAllOrdersService;
