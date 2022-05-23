import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("adress")
class Adress {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  postalcode: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Adress;
