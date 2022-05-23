export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  addess_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface ICompanyCreate {
  name: string;
  cnpj: string;
  type: string;
  addess_id: string;
  owner_id: string;
}

export interface ICompanyUpdate {
  name: string;
  cnpj: string;
  type: string;
}
