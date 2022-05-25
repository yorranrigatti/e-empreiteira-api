import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("orders")
export class Orders {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  status: string;

  @Column()
  isBudget: boolean;

  @Column()
  delivery_date: string;

  @Column()
  employee_id: string;

  @Column()
  client_id: string;

  @Column()
  cart_id: string;

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