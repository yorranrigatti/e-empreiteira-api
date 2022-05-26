import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { CompanyOwner } from "./companyOwner.entity";
import Address from "./address";
import Client from "./client";

@Entity("companies")
export class Companies {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  address_id: string;

  @Column()
  owner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @ManyToOne((type) => CompanyOwner, (companyOwner) => companyOwner.companies)
  @JoinTable()
  owner: CompanyOwner;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
