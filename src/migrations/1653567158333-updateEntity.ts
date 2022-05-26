import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEntity1653567158333 implements MigrationInterface {
    name = 'updateEntity1653567158333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emploees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5dee858fa2e82b07d9cc9c66aff" UNIQUE ("email"), CONSTRAINT "PK_82564ccb1e09957d580ffcc2a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "cnpj" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "cnpj" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "emploees"`);
    }

}
