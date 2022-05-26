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
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { CompanyOwner } from "./companyOwner.entity";
import Address from "./address";
import Client from "./client";
import Emploee from "./emploee";
import { Product } from "./product.entity";

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

  @OneToMany((type) => Emploee, (emploee) => emploee.company, {
    eager: true,
  })
  emploees: Emploee[];

  @OneToMany((type) => Product, (products) => products.company, {
    eager: true,
  })
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
