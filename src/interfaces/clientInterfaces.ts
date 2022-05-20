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
