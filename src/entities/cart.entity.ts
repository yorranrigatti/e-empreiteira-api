import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Orders } from "./orders.entity";
import { Product } from "./product.entity";
import ProductCart from "./productCart.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("float")
  subtotal: number;

  @Column()
  quantity_total_itens: number;

  @OneToMany((type) => ProductCart, (ProductCart) => ProductCart.cart, {
    eager: true,
  })
  productCart: ProductCart[];

  @OneToMany((type) => Orders, (orders) => orders.cart)
  order: Orders[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
