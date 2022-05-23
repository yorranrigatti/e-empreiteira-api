export interface IOwner {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: number;
  cellphone: number;
}

export interface IOwnerCreate {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: number;
  cellphone: number;
}

export interface IOwnerReturn {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cpf?: number;
  cellphone?: number;
}

export interface IOwnerLogin {
  email: string;
  password: string;
}

export interface IOwnerUpdate {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cpf?: number;
  cellphone?: number;
}
