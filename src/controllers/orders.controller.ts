import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createOrderService from "../services/orders/createOrder.service";
import deleteOrderService from "../services/orders/deleteOrder.service";
import listAllOrdersService from "../services/orders/listAllOrders.service";
import listOneOrderService from "../services/orders/listOneOrder.service";
import updateOrderService from "../services/orders/updateOrder.service";

class OrdersController {
  static async store(req: Request, res: Response) {
    try {
      const { status, isBudget, delivery_date, employee_id, client_id } =
        req.body;
      const result = await createOrderService({
        status,
        isBudget,
        delivery_date,
        employee_id,
        client_id,
      });

      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await listOneOrderService(id);

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  static async index(req: Request, res: Response) {
    try {
      const result = await listAllOrdersService();

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, isBudget, delivery_date } = req.body;
      const result = await updateOrderService({
        id,
        status,
        isBudget,
        delivery_date,
      });

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await deleteOrderService(id);

      return res.status(204).json();
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
}

export default OrdersController;
