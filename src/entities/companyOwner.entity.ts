import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./companies.entity";

@Entity("company_owner")
export class CompanyOwner {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({unique: true})
  cpf: string;

  @Column({unique: true})
  cellphone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Companies, (companies) => companies.owner, {
    eager: true,
  })
  @JoinTable()
  companies: Companies[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
