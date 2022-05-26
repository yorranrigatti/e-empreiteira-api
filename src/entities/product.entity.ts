import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Companies } from "./companies.entity";
import ProductCart from "./productCart.entity";
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

  @ManyToOne((type) => Companies, (companies) => companies.products)
  @JoinTable()
  company: Companies;

  @OneToMany(
    (type) => StockProducts,
    (stockProducts) => stockProducts.product,
    {
      eager: true,
    }
  )
  stock: StockProducts[];

  @OneToMany((type) => ProductCart, (ProductCart) => ProductCart.product, {
    eager: true,
  })
  @JoinTable()
  carts: ProductCart[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
