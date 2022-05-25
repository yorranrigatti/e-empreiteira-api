import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOwnerEntity1653489752656 implements MigrationInterface {
    name = 'updateOwnerEntity1653489752656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "company_owner" ADD "cpf" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "company_owner" ADD "cpf" integer NOT NULL`);
    }

}
