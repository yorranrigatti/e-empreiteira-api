import { MigrationInterface, QueryRunner } from "typeorm";

export class tableClientsUpdate1653049990925 implements MigrationInterface {
    name = 'tableClientsUpdate1653049990925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cellphone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cellphone"`);
    }

}
