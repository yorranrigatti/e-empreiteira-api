import { Request, Response } from "express";
import { AppError } from "../errors/appError";
import createCompanyService from "../services/companies/createCompany.service";
import deleteCompanyService from "../services/companies/deleteCompany.service";
import listAllCompaniesService from "../services/companies/listAllCompanies.service";
import listOneCompanyService from "../services/companies/listOneCompany.service";
import updateCompanyService from "../services/companies/updateCompany.service";

class CompaniesController {
  static async store(req: Request, res: Response) {
    const { name, cnpj, type, addess_id, owner_id } = req.body;
    try {
      const result = await createCompanyService({
        name,
        cnpj,
        type,
        addess_id,
        owner_id,
      });

      return res.status(201).json(result);
    } catch (err) {}
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await listOneCompanyService(id);

      return res.json(result);
    } catch (err) {}
  }

  static async index(req: Request, res: Response) {
    try {
      const result = await listAllCompaniesService();

      return res.json(result);
    } catch (err) {}
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, cnpj, type } = req.body;
    try {
      const result = await updateCompanyService(id, { name, cnpj, type });

      return res.json(result);
    } catch (err) {}
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await deleteCompanyService(id);

      return res.status(204).json();
    } catch (err) {}
  }
}

export default CompaniesController;
