import { AppDataSource } from "../../data-source";
import { Orders } from "../../entities/orders.entity";
import { IOrderUpdate } from "../../interfaces/order";

const updateOrderService = async ({
  id,
  status,
  delivery_date,
  isBudget,
}: IOrderUpdate) => {
  const ordersRepository = AppDataSource.getRepository(Orders);

  const order = await ordersRepository.findOne({ where: { id } });

  status ? (order!.status = status) : order!.status;
  delivery_date ? (order!.delivery_date = delivery_date) : order!.delivery_date;
  isBudget !== undefined ? (order!.isBudget = isBudget) : order!.isBudget;

  await ordersRepository.save(order!);

  return order;
};

export default updateOrderService;
