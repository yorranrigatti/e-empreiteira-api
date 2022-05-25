import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("float")
  subtotal: number;

  @Column()
  quantity_total_itens: number;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
