import { AppDataSource } from "../../data-source";
import { Orders } from "../../entities/orders.entity";

const listOneOrderService = async (id: string) => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  return await ordersRepository.findOne({ where: { id } });
};

export default listOneOrderService;
