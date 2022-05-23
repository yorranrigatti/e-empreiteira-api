import { MigrationInterface, QueryRunner } from "typeorm";

export class tableClients1652972119995 implements MigrationInterface {
    name = 'tableClients1652972119995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "last_name" TO "lastName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "lastName" TO "last_name"`);
    }

}
