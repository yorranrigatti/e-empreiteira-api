import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const authOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers.authorization;
  try {
    const [token] = tokenHeader!.split(" ");

    jwt.verify(
      token,
      process.env.JWT_SECRET || "default",
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
