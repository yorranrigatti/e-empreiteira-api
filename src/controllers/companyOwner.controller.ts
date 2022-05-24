import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createOwnerService from "../services/companyOwner/createOwner.service";
import deleteOwnerService from "../services/companyOwner/deleteOwner.service";
import listAllOwnersService from "../services/companyOwner/listAllOwners.service";
import listOneOwnerService from "../services/companyOwner/listOneOwner.service";
import loginOwner from "../services/companyOwner/loginOwner.service";
import updateOwnerService from "../services/companyOwner/updateOwner.service";

class CompanyOwnerController {
  static async store(req: Request, res: Response) {
    const { name, lastName, email, password, cpf, cellphone } = req.body;
    try {
      const result = createOwnerService({
        name,
        lastName,
        email,
        password,
        cpf,
        cellphone,
      });

      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await listOneOwnerService(id);

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const result = await listAllOwnersService();

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, lastName, email, password, cpf, cellphone } = req.body;
    try {
      const result = await updateOwnerService(id, {
        name,
        lastName,
        email,
        password,
        cpf,
        cellphone,
      });

      return res.json(result);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await deleteOwnerService(id);

      return res.status(204).json();
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await loginOwner({ email, password });

      return res.status(201).json({ token: result });
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
}

export default CompanyOwnerController;
