import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
  
  @Entity("emploees")
  class Emploee {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column()
    name: string;
  
    @Column()
    lastName: string;
  
    @Column({unique:true})
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
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  
  export default Emploee;
  