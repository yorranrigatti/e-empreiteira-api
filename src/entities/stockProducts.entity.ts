import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";

@Entity("stock_products")
class StockProducts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  product_id: string;

  @Column()
  sale_price: number;

  @Column()
  cost_price: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  expiration_date: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne((type) => Product, (product) => product.stock)
  @JoinTable()
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default StockProducts;
