import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createAddressCompanyService from "../services/companies/createAddressCompany.service";

class SetAddressCompanyController {
  static async store(req: Request, res: Response) {
    const {
      company_id,
      street,
      city,
      state,
      number,
      postalcode,
      complement,
      country,
    } = req.body;
    try {
      const result = await createAddressCompanyService({
        id: company_id,
        street,
        city,
        state,
        number,
        postalcode,
        complement,
        country,
      });

      return res.status(201).json(result);
    } catch (err: any) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
}

export default SetAddressCompanyController;
