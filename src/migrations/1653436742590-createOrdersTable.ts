import { MigrationInterface, QueryRunner } from "typeorm";

export class createOrdersTable1653436742590 implements MigrationInterface {
    name = 'createOrdersTable1653436742590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar NOT NULL, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "companiesId" varchar)`);
        await queryRunner.query(`CREATE TABLE "adress" ("id" varchar PRIMARY KEY NOT NULL, "country" varchar NOT NULL, "state" varchar NOT NULL, "city" varchar NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "complement" varchar NOT NULL, "postalcode" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" varchar NOT NULL, "employee_id" varchar NOT NULL, "client_id" varchar NOT NULL, "cart_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_company_owner" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "companiesId" varchar, CONSTRAINT "FK_011431798fb6c4fea50dab63fa3" FOREIGN KEY ("companiesId") REFERENCES "companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_company_owner"("id", "name", "lastName", "email", "password", "cpf", "cellphone", "created_at", "updated_at", "companiesId") SELECT "id", "name", "lastName", "email", "password", "cpf", "cellphone", "created_at", "updated_at", "companiesId" FROM "company_owner"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`ALTER TABLE "temporary_company_owner" RENAME TO "company_owner"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_owner" RENAME TO "temporary_company_owner"`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "companiesId" varchar)`);
        await queryRunner.query(`INSERT INTO "company_owner"("id", "name", "lastName", "email", "password", "cpf", "cellphone", "created_at", "updated_at", "companiesId") SELECT "id", "name", "lastName", "email", "password", "cpf", "cellphone", "created_at", "updated_at", "companiesId" FROM "temporary_company_owner"`);
        await queryRunner.query(`DROP TABLE "temporary_company_owner"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "adress"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
