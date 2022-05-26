import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import deleteClientAdressService from "../services/adress/deleteClientAdress.service";
import setClientAdressService from "../services/adress/setClientAdress.service";

import CreateClientService from "../services/client/createClient.service";
import DeleteClientService from "../services/client/deleteClient.service";
import ListClientsService from "../services/client/listClients.service";
import ShowClientService from "../services/client/showClient.service";
import UpdateClientService from "../services/client/updateClient.service";

export default class ClientController {
  static async store(req: Request, res: Response) {
    try {
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
        cart: client.cart,
      };

      return res.status(201).json(returnedClient);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const listClients = new ListClientsService();

      const clients = await listClients.execute();

      return res.json(clients);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const showClient = new ShowClientService();

      const client = await showClient.execute(id);

      return res.json(client);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
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
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteClient = new DeleteClientService();

      const deleted = await deleteClient.execute(id);

      return res.json(deleted);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async setAdress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { country, state, city, street, number, complement, postalcode } =
        req.body;

      const setAdress = new setClientAdressService();

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
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async deleteAdress(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteAdress = new deleteClientAdressService();

      const client = await deleteAdress.execute(id);

      return res.json(client);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}
