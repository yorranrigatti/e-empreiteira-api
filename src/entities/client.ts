import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Orders } from "./orders.entity";
import { Cart } from "./cart.entity";
import Adress from "./address";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  cellphone: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => Adress, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  adress: Adress;
  
  @OneToOne((type) => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany((type) => Orders, (orders) => orders.client, {
    eager: true,
  })
  orders: Orders[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Client;
