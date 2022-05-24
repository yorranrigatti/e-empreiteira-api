export interface ICreateClient {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cellphone: number;
}

export interface IUpdateClient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cellphone: number;
}

export interface ICreateAdress {
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  postalcode: number;
}

export interface IUpdateAdress {
  id: string;
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  postalcode: number;
}

export interface ISetClientAdress {
  id: string;
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  postalcode: number;
}

export interface ISetClientAdressCreate {
  country: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
  postalcode: number;
}
