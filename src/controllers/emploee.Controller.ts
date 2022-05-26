import { Request, Response } from "express";
import CreateEmploeeService from "../services/emploee/createEmploee.service";
import DeleteEmploeeService from "../services/emploee/deleteEmploee.service";
import ListEmploeesService from "../services/emploee/listEmploee.service";
import ShowEmploeeService from "../services/emploee/showEmploee.service";
import UpdateEmploeeService from "../services/emploee/updateEmploee.service";

// import CreateClientService from "../services/client/createClient.service";
// import DeleteClientService from "../services/client/deleteClient.service";
// import ListClientsService from "../services/client/listClients.service";
// import ShowClientService from "../services/client/showClient.service";
// import UpdateClientService from "../services/client/updateClient.service";

export default class EmploeeController {
  static async store(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, email, cpf, password, cellphone, role } = req.body;

    const createEmploee = new CreateEmploeeService();

    const emploee = await createEmploee.execute({
      name,
      lastName,
      email,
      password,
      cellphone,
      cpf,
      role,
      company_id: id,
    });

    const returnedEmploee = {
      id: emploee.id,
      name: emploee.name,
      lastName: emploee.lastName,
      email: emploee.email,
      cpf: emploee.cpf,
      role: emploee.role,
      cellphone: emploee.cellphone,
      created_at: emploee.created_at,
      updated_at: emploee.updated_at,
    };

    return res.status(201).json(returnedEmploee);
  }

  static async index(req: Request, res: Response) {
    const listEmploees = new ListEmploeesService();

    const emploees = await listEmploees.execute();

    return res.json(emploees);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showEmploee = new ShowEmploeeService();

    const emploee = await showEmploee.execute(id);

    return res.json(emploee);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, email, cellphone, cpf, role } = req.body;

    const updateEmploee = new UpdateEmploeeService();

    const updated = await updateEmploee.execute({
      id,
      name,
      lastName,
      email,
      cellphone,
      cpf,
      role,
    });

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteEmploee = new DeleteEmploeeService();

    const deleted = await deleteEmploee.execute(id);

    return res.json(deleted);
  }
}
