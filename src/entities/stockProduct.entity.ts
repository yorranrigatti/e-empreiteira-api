import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";

@Entity("stock_products")
class StockProducts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  retail_price: number;

  @Column()
  wholesale_price: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  qty_available: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Product, (product) => product.stockProducts)
  @JoinColumn()
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default StockProducts;
