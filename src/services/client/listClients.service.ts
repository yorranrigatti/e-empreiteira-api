import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { IClientReturn } from "../../interfaces/clientInterfaces";

export default class ListClientsService {
  async execute(): Promise<IClientReturn[]> {
    const clientRepository = AppDataSource.getRepository(Client);

    const clients = await clientRepository.find();
    
    const result = clients.map((client: any): any => {
      delete client.password;

      
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        cellphone: client.cellphone,
        create_at: client.created_at,
        update_at: client.updated_at,
        address: client.adress,
        productsCart: client.cart.productCart.map((products: any) => products.product_id)
      }
    });

    return result;
  }
}
