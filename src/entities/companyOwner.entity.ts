import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
