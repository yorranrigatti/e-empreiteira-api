import { Response, Request, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { CompanyOwner } from "../entities/companyOwner.entity";
import { AppError } from "../errors/appError";

const verifyOwnerAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, cpf } = req.body;
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);
  
  

  next();
};

export default verifyOwnerAlreadyExistsMiddleware;
