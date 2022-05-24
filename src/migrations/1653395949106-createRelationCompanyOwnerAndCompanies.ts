import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelationCompanyOwnerAndCompanies1653395949106 implements MigrationInterface {
    name = 'createRelationCompanyOwnerAndCompanies1653395949106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" varchar PRIMARY KEY NOT NULL, "country" varchar NOT NULL, "state" varchar NOT NULL, "city" varchar NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "complement" varchar NOT NULL, "postalcode" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "ownerId" varchar)`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "ownerId" varchar, CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_companies"("id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "ownerId") SELECT "id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "ownerId" FROM "companies"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`ALTER TABLE "temporary_companies" RENAME TO "companies"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME TO "temporary_companies"`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "ownerId" varchar)`);
        await queryRunner.query(`INSERT INTO "companies"("id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "ownerId") SELECT "id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "ownerId" FROM "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
