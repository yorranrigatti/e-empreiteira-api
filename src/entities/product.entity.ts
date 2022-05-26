import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import StockProducts from "./stockProducts.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  company_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => StockProducts, (stockProducts) => stockProducts.product)
  @JoinColumn()
  stockProducts: StockProducts;

  // @OneToMany((type) => ProductCart, (ProductCart) => ProductCart.product, {
  //   eager: true,
  // })
  // @JoinTable()
  // productCart: ProductCart[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
