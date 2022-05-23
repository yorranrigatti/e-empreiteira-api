import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
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

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default StockProducts;
