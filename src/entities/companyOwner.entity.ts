import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
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

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: number;

  @Column()
  cellphone: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Companies, (companies) => companies.companyOwner)
  companies: Companies[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
