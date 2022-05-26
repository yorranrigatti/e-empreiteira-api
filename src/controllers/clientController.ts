import { Request, Response } from "express";
import deleteClientAdressService from "../services/adress/deleteClientAdress.service";
import setClientAdressService from "../services/adress/setClientAdress.service";

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

<<<<<<< HEAD
    const returnedClient = {
      id: client.id,
      name: client.name,
      lastName: client.lastName,
      email: client.email,
      cellphone: client.cellphone,
      created_at: client.created_at,
      updated_at: client.updated_at,
      cart: client.cart,
    };

    return res.status(201).json(returnedClient);
=======
    return res.status(201).json(client);
>>>>>>> 1998d72536a2cac085c1a8bbb74556a57b3c57ec
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

  static async setAdress(req: Request, res: Response) {
    const { id } = req.params;
    const { country, state, city, street, number, complement, postalcode } =
      req.body;

    const setAdress = new  setClientAdressService();

    const client = await setAdress.execute({
      id,
      country,
      state,
      city,
      street,
      number,
      complement,
      postalcode,
    });

    return res.json(client);
  }

  static async deleteAdress(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAdress = new deleteClientAdressService();

    const client = await deleteAdress.execute(id);

    return res.json(client);
  }
}
