import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity("product_cart")
class ProductCart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Cart, (Cart) => Cart.productCart)
  @JoinTable()
  cart: Cart[];

  @ManyToOne((type) => Product, (product) => product.carts)
  @JoinTable()
  product: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProductCart;
