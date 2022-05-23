import { MigrationInterface, QueryRunner } from "typeorm";

export class tableClientsUpdate1653050381378 implements MigrationInterface {
    name = 'tableClientsUpdate1653050381378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cellphone" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cellphone" character varying NOT NULL`);
    }

}
