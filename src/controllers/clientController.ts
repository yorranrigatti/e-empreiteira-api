import { Request, Response } from "express";

import CreateClientService from "../services/client/createClient.service";
import DeleteClientService from "../services/client/deleteClient.service";
import ListClientsService from "../services/client/listClients.service";
import ShowClientService from "../services/client/showClient.service";
import UpdateClientService from "../services/client/updateClient.service";

export default class ClientController {
  static async store(req: Request, res: Response) {
    const { name, lastName, email, password, cellphone } = req.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      name,
      lastName,
      email,
      password,
      cellphone,
    });

    const returnedClient = {
      id: client.id,
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      cellphone: client.cellphone,
      created_at: client.created_at,
      updated_at: client.updated_at,
    };

    return res.status(201).json(returnedClient);
  }

  static async index(req: Request, res: Response) {
    const listClients = new ListClientsService();

    const clients = await listClients.execute();

    return res.json(clients);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showClient = new ShowClientService();

    const client = await showClient.execute(id);

    return res.json(client);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, email, cellphone } = req.body;

    const updateClient = new UpdateClientService();

    const updated = await updateClient.execute({
      id,
      name,
      lastName,
      email,
      cellphone,
    });

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClient = new DeleteClientService();

    const deleted = await deleteClient.execute(id);

    return res.json(deleted);
  }
}