export interface IOwner {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
}

export interface IOwnerCreate {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
}

export interface IOwnerReturn {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cpf?: string;
  cellphone?: string;
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
  cpf?: string;
  cellphone?: string;
}
