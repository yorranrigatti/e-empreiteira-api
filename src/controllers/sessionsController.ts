import { Request, Response } from "express";
import ClientLoginService from "../services/sessions/clientLogin.service";

export default class SessionController {
  static async store(request: Request, response: Response) {
    const { email, password } = request.body;
    const clientLogin = new ClientLoginService();

    const client = await clientLogin.execute({
      email,
      password,
    });

    return response.json(client);
  }
}
