import { Response, Request, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { CompanyOwner } from "../entities/companyOwner.entity";
import { AppError } from "../errors/appError";

const verifyOwnerIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const owner = await companyOwnerRepository.findOne({
    where: { id },
  });

  if (!owner) {
    throw new AppError("Not found any company owner with this id", 404);
  }

  next();
};

export default verifyOwnerIdMiddleware;
