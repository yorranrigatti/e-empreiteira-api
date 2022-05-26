import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEntity11653568389424 implements MigrationInterface {
    name = 'updateEntity11653568389424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "adressId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_1eb3fb3f46649cced8e9a8c95d8" UNIQUE ("adressId")`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "complement" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8" FOREIGN KEY ("adressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_1eb3fb3f46649cced8e9a8c95d8"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "adressId"`);
    }

}
