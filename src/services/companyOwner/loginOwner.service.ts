import { AppDataSource } from "../../data-source";
import { CompanyOwner } from "../../entities/companyOwner.entity";
import { IOwnerLogin } from "../../interfaces/owner";
import { AppError } from "../../errors/appError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginOwner = async ({ email, password }: IOwnerLogin) => {
  const companyOwnerRepository = AppDataSource.getRepository(CompanyOwner);
  const owner = await companyOwnerRepository.findOne({
    where: { email },
  });

  if (!owner) {
    throw new AppError("Wrong email/password", 403);
  }

  if (!bcrypt.compareSync(password, owner.password)) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign(
    { email: email },
    process.env.JWT_SECRET || "default",
    {
      expiresIn: "1d",
    }
  );

  return { owner, token };
};

export default loginOwner;
