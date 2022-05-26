import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import Client from "./client";
import Emploee from "./emploee";
import { Product } from "./product.entity";

@Entity("orders")
export class Orders {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ unique: false })
  status: string;

  @Column({ unique: false })
  isBudget: boolean;

  @Column({ unique: false })
  delivery_date: string;

  @Column({ unique: false })
  employee_id: string;

  @Column({ unique: false })
  client_id: string;

  @Column({ unique: false })
  cart_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Cart, {
    eager: true,
  })
  @JoinTable()
  cart: Cart;

  @ManyToOne((type) => Emploee, (emploee) => emploee.orders)
  @JoinTable()
  emploee: Emploee;

  @ManyToOne((type) => Client, (client) => client.orders)
  @JoinTable()
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
