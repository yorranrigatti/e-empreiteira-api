import { Response, Request, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { AppError } from "../../errors/appError";

const verifyOwnerAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, cpf } = req.body;

  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);

  const companyOwnersEmail = await companyOwnerRepository.findOne({
    where: { email },
  });

  if (companyOwnersEmail) {
    throw new AppError("Email already exists", 409);
  }

  const companyOwnersCpf = await companyOwnerRepository.findOne({
    where: { cpf },
  });

  if (companyOwnersCpf) {
    throw new AppError("Cfp already exists", 409);
  }

  next();
};

export default verifyOwnerAlreadyExistsMiddleware;
