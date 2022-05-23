import { MigrationInterface, QueryRunner } from "typeorm";

export class createCompanyOwnerTable1653080637503 implements MigrationInterface {
    name = 'createCompanyOwnerTable1653080637503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, CONSTRAINT "PK_0c6ea8a32565efcb512e572d61d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company_owner"`);
    }

}
