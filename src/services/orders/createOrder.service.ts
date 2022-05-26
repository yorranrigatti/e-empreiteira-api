import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import Emploee from "../../entities/emploee";
import { Orders } from "../../entities/orders.entity";
import { AppError } from "../../errors/appError";
import { IOrderCreate } from "../../interfaces/order";

const createOrderService = async ({
  status,
  isBudget,
  client_id,
  delivery_date,
  employee_id,
}: IOrderCreate) => {
  try {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const clientRepository = AppDataSource.getRepository(Client);
    const emploeeRepository = AppDataSource.getRepository(Emploee);

    const client = await clientRepository.findOne({ where: { id: client_id } });

    const emploee = await emploeeRepository.findOne({
      where: { id: employee_id },
    });

    const order = new Orders();
    order.status = status;
    order.isBudget = isBudget;
    order.delivery_date = delivery_date;
    order.employee_id = employee_id;
    order.cart_id = client!.cart.id;
    order.client_id = client_id;
    order.cart = [...client!.cart.productCart];

    emploee!.orders = [...emploee!.orders, order];

    client!.orders = [...client!.orders, order];

    client!.cart.productCart = [];
    client!.cart.quantity_total_itens = 1;
    client!.cart.subtotal = 1;

    console.log(order, "-----------------ORDER");
    console.log(emploee, "-----------------EMPLOEE");
    console.log(client, "---------------CLIENT");

    ordersRepository.create(order);

    await ordersRepository.save(order!);

    await emploeeRepository.save(emploee!);

    await clientRepository.save(client!);

    return order;
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
};

export default createOrderService;
