import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import ProductCart from "./productCart.entity";

@Entity("Cart")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  subTotal: number;

  @Column()
  quantity_total_itens: number;

  @OneToMany((type) => ProductCart, (ProductCart) => ProductCart.cart, {
    eager: true,
  })
  @JoinTable()
  productCart: ProductCart[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Cart;
