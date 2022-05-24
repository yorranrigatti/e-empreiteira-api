import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteAdress1653415372847 implements MigrationInterface {
    name = 'deleteAdress1653415372847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8" FOREIGN KEY ("adressId") REFERENCES "adress"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8" FOREIGN KEY ("adressId") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
