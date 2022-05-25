import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./companies.entity";
import StockProducts from "./stockProducts.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Companies, (company) => company)
  company: Companies;

  @OneToOne(() => StockProducts, { onDelete: "CASCADE" })
  @JoinColumn()
  stockProduct: StockProducts;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
