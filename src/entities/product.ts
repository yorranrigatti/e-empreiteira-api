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

@Entity("Product")
class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  company_id: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;

  @OneToMany((type) => ProductCart, (ProductCart) => ProductCart.product, {
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

export default Product;
