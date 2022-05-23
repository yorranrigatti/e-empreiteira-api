import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  try {
    const [, token] = authHeader.split(" ");

    const secret = process.env.SECRET_KEY || "default";

    const decoded = verify(token, secret);

    const { sub } = decoded;

    req.client = {
      id: sub as string,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid token");
  }
}
