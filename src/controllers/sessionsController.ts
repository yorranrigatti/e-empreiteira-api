import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import ClientLoginService from "../services/sessions/clientLogin.service";

export default class SessionController {
  static async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const clientLogin = new ClientLoginService();

      const client = await clientLogin.execute({
        email,
        password,
      });
      return res.json(client);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}
