import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { AppError } from "../errors/appError";

const verifyOrderIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ordersRepository = AppDataSource.getRepository(Orders);

  const order = ordersRepository.findOne({ where: { id } });

  if (!order) {
    throw new AppError("Not found any order with this id", 404);
  }

  next();
};

export default verifyOrderIdExistMiddleware;
