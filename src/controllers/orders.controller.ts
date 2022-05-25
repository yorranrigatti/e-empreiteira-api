import { Request, Response } from "express";
import createOrderService from "../services/orders/createOrder.service";
import deleteOrderService from "../services/orders/deleteOrder.service";
import listAllOrdersService from "../services/orders/listAllOrders.service";
import listOneOrderService from "../services/orders/listOneOrder.service";
import updateOrderService from "../services/orders/updateOrder.service";

class OrdersController {
  static async store(req: Request, res: Response) {
    const { status, isBudget, delivery_date, employee_id, client_id, cart_id } =
      req.body;
    try {
      const result = await createOrderService({
        status,
        isBudget,
        delivery_date,
        employee_id,
        client_id,
        cart_id,
      });

      return res.status(201).json(result);
    } catch (err) {}
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await listOneOrderService(id);

      return res.json(result);
    } catch (err) {}
  }
  static async index(req: Request, res: Response) {
    try {
      const result = await listAllOrdersService();

      return res.json(result);
    } catch (err) {}
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status, isBudget, delivery_date } = req.body;
    try {
      const result = await updateOrderService({
        id,
        status,
        isBudget,
        delivery_date,
      });

      return res.json(result);
    } catch (err) {}
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await deleteOrderService(id);

      return res.status(204).json();
    } catch (err) {}
  }
}

export default OrdersController;

