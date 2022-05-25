import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("stock_products")
class StockProducts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  sale_price: number;

  @Column()
  cost_price: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  qty_available: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default StockProducts;
