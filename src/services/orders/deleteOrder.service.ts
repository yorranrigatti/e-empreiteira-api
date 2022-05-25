import { AppDataSource } from "../../data-source";
import { Orders } from "../../entities/orders.entity";

const deleteOrderService = async (id: string) => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  return await ordersRepository.delete(id);
};

export default deleteOrderService;
