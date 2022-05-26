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
  product_id: string;

  @Column()
  sale_price: number;

  @Column()
  cost_price: number;

  @Column()
  category: string;

  @Column()
  mark: string;

  @Column()
  qty_available: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

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
