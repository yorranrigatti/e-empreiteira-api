import { MigrationInterface, QueryRunner } from "typeorm";

export class complementNullable1653417598962 implements MigrationInterface {
    name = 'complementNullable1653417598962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adress" ALTER COLUMN "complement" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adress" ALTER COLUMN "complement" SET NOT NULL`);
    }

}
