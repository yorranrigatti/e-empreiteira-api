import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Companies } from "./companies.entity";
import { Orders } from "./orders.entity";

@Entity("employees")
class Emploee {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  cellphone: string;

  @Column()
  role: string;

  @Column()
  company_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Orders, (orders) => orders.emploee, {
    eager: true,
  })
  orders: Orders[];

  @ManyToOne((type) => Companies, (companies) => companies.emploees)
  @JoinTable()
  company: Companies;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Emploee;
