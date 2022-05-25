import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOwnerEntity21653491066511 implements MigrationInterface {
    name = 'updateOwnerEntity21653491066511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" ADD CONSTRAINT "UQ_2e71e930627351c26207d1a299d" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "company_owner" ADD CONSTRAINT "UQ_fccef7ad26ce72df7926a421ef6" UNIQUE ("cpf")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP CONSTRAINT "UQ_fccef7ad26ce72df7926a421ef6"`);
        await queryRunner.query(`ALTER TABLE "company_owner" DROP CONSTRAINT "UQ_2e71e930627351c26207d1a299d"`);
    }

}
