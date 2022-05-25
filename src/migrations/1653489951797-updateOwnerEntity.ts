import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOwnerEntity1653489951797 implements MigrationInterface {
    name = 'updateOwnerEntity1653489951797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "company_owner" ADD "cellphone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "company_owner" ADD "cellphone" integer NOT NULL`);
    }

}
