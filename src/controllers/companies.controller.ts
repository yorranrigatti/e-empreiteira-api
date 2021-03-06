import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createCompanyService from "../services/companies/createCompany.service";
import deleteCompanyService from "../services/companies/deleteCompany.service";
import listAllCompaniesService from "../services/companies/listAllCompanies.service";
import listOneCompanyService from "../services/companies/listOneCompany.service";
import updateCompanyService from "../services/companies/updateCompany.service";

class CompaniesController {
  static async store(req: Request, res: Response) {
    try {
      const { name, cnpj, type, address_id, owner_id } = req.body;
      const result = await createCompanyService({
        name,
        cnpj,
        type,
        address_id,
        owner_id,
      });

      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await listOneCompanyService(id);

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const result = await listAllCompaniesService();

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, cnpj, type } = req.body;
      const result = await updateCompanyService(id, { name, cnpj, type });

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await deleteCompanyService(id);

      return res.status(204).json();
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
}

export default CompaniesController;
