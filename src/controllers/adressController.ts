import { Request, Response } from "express";
import CreateAdressService from "../services/adress/createAdress.service";
import DeleteAdressService from "../services/adress/deleteAdress.service";
import listAdressService from "../services/adress/listAdress.service";
import ShowAdressService from "../services/adress/showAdress.service";
import UpdateAdressService from "../services/adress/updateAdress.service";

export default class AdressController {
  static async store(req: Request, res: Response) {
    const { country, state, city, street, number, complement, postalcode } =
      req.body;

    const createAdress = new CreateAdressService();

    const adress = await createAdress.execute({
      country,
      state,
      city,
      street,
      number,
      complement,
      postalcode,
    });

    return res.status(201).json(adress);
  }

  static async index(req: Request, res: Response) {
    const listAdress = new listAdressService();

    const adress = await listAdress.execute();

    return res.json(adress);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showAdress = new ShowAdressService();

    const adress = await showAdress.execute(id);

    return res.json(adress);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { country, state, city, street, number, complement, postalcode } =
      req.body;

    const updateAdress = new UpdateAdressService();

    const updated = await updateAdress.execute({
      id,
      country,
      state,
      city,
      street,
      number,
      complement,
      postalcode,
    });

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAdress = new DeleteAdressService();

    const deleted = await deleteAdress.execute(id);

    return res.json(deleted);
  }
}
