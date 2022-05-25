import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const authOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.ownerId = decoded.email;
        next();
      }
    );
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
};

export default authOwnerMiddleware;
