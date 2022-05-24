import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import Cart from "./cart";
import Product from "./product";

@Entity("Product Cart")
class ProductCart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Cart, (Cart) => Cart.productCart)
  @JoinTable()
  cart: Cart[];

  @ManyToOne((type) => Product, (product) => product.productCart)
  @JoinTable()
  product: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProductCart;
