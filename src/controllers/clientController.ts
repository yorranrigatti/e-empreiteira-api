import { Request, Response } from "express";
import CreateClientService from "../services/client/createClient.service";
import ListClientsService from "../services/client/listClients.service";

export default class ClientController {
  static async store(req: Request, res: Response) {
    const { name, lastName, email, password } = req.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      name,
      lastName,
      email,
      password,
    });

    return res.status(201).json(client);
  }

  static async index(req: Request, res: Response) {
    const listClients = new ListClientsService();

    const clients = await listClients.execute();

    return res.json(clients);
  }

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
