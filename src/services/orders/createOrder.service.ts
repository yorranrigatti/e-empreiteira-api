import { AppDataSource } from "../../data-source";
import { Orders } from "../../entities/orders.entity";
import { AppError } from "../../errors/appError";
import { IOrderCreate } from "../../interfaces/order";

const createOrderService = async ({
  status,
  isBudget,
  cart_id,
  client_id,
  delivery_date,
  employee_id,
}: IOrderCreate) => {
  try {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = new Orders();
    order.status = status;
    order.isBudget = isBudget;
    order.delivery_date = delivery_date;
    order.employee_id = employee_id;
    order.cart_id = cart_id;
    order.client_id = client_id;

    ordersRepository.create(order);
    await ordersRepository.save(order);

    return order;
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
};

export default createOrderService;
