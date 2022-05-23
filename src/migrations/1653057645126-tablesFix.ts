import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesFix1653057645126 implements MigrationInterface {
    name = 'tablesFix1653057645126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "postalcode" integer NOT NULL, CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postalcode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "postalcode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "complement" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
