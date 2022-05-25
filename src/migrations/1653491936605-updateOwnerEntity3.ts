import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOwnerEntity31653491936605 implements MigrationInterface {
    name = 'updateOwnerEntity31653491936605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" ADD CONSTRAINT "UQ_0e8bc99ff4fa2e5ec94dfe5e74e" UNIQUE ("cellphone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP CONSTRAINT "UQ_0e8bc99ff4fa2e5ec94dfe5e74e"`);
    }

}
