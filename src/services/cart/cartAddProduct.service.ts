import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import Client from "../../entities/client";
import { Product } from "../../entities/product.entity";
import ProductCart from "../../entities/productCart.entity";
import { AppError } from "../../errors/appError";

const cartAddProductService = async (product_id: string, client_id: string) => {
  try {
    const clientRepo = AppDataSource.getRepository(Client);
    const cartRepo = AppDataSource.getRepository(Cart);
    const productRepo = AppDataSource.getRepository(Product);
    const productCartRepo = AppDataSource.getRepository(ProductCart);

    const client = await clientRepo.findOne({ where: { id: client_id } });

    if (!client) {
      throw new AppError("no user logon/user not found", 401);
    }

    const cart = await cartRepo.findOne({ where: { id: client!.cart.id } });

    const product = await productRepo.findOne({ where: { id: product_id } });

    if (!product) {
      throw new AppError("product not found", 404);
    }

    const productCart = new ProductCart();
    productCart.client_id = client_id;
    productCart.product_id = product_id;
    productCart.cart = cart!;
    productCart.product = product;

    productCartRepo.create(productCart);

    await productCartRepo.save(productCart);

    client.cart.productCart.push(productCart);

    await clientRepo.save(client);

    // await cartRepo.save(cart!);

    return client.cart;
  } catch (err: any) {
    throw new AppError(err.message, 500);
  }
};

export default cartAddProductService;
