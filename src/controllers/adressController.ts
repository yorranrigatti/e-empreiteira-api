import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import listAdressService from "../services/adress/listAdress.service";
import ShowAdressService from "../services/adress/showAdress.service";

export default class AdressController {
  static async index(req: Request, res: Response) {
    try {
      const listAdress = new listAdressService();

      const adress = await listAdress.execute();

      return res.json(adress);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }

  static async show(req: Request, res: Response) {
    try {

      const { id } = req.params;
  
      const showAdress = new ShowAdressService();
  
      const adress = await showAdress.execute(id);
  
      return res.json(adress);
    } catch (err) {
      if (err instanceof AppError) {
        return handleError(err, res);
      }
    }
  }
}
