import Adress from "../entities/address";
import { Cart } from "../entities/cart.entity";
import ProductCart from "../entities/productCart.entity";

export interface ICreateClient {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cellphone: string;
}

export interface IUpdateClient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
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

export interface IClientReturn {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  cellphone: string;
  created_at: Date;
  updated_at: Date;
  adress: Adress | null;
  cart: Cart;
  productsCart?: ProductCart[];
}
