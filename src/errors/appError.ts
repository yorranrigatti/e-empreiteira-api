import { Response } from "express";

export class AppError extends Error {
  statusCode;

  constructor(message: string, statusCode = 400) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
