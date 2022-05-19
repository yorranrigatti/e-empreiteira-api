import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("float")
  subtotal: number;

  @ManyToMany((type) => Product, { eager: true })
  products: Product[];
}
