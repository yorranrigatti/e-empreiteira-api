import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { CompanyOwner } from "./companyOwner.entity";

@Entity("companies")
export class Companies {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cnpj: number;

  @Column()
  type: string;

  @Column()
  address_id: string;

  @Column()
  owner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => CompanyOwner, (companyOwner) => companyOwner.companies, {
    eager: true,
  })
  owner: CompanyOwner[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
