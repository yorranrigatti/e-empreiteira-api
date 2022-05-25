export interface ICreateEmploee {
    name: string;
    lastName: string;
    email: string;
    password: string;
    cpf:string;
    cellphone: string;
    role:string;
  }
  
  export interface IUpdateEmploee {
    id: string;
    name: string;
    lastName: string;
    email: string;
    cpf:string;
    cellphone: string;
    role:string;
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
  
  export interface ISetEmploeeAdress {
    id: string;
    country: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement?: string;
    postalcode: number;
  }
  
  export interface ISetEmploeeAdressCreate {
    country: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement?: string;
    postalcode: number;
  }
  