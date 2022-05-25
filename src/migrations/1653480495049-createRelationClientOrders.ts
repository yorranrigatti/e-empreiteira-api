import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelationClientOrders1653480495049 implements MigrationInterface {
    name = 'createRelationClientOrders1653480495049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" varchar PRIMARY KEY NOT NULL, "country" varchar NOT NULL, "state" varchar NOT NULL, "city" varchar NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "complement" varchar NOT NULL, "postalcode" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "company_id" varchar NOT NULL, "create_at" datetime NOT NULL, "update_at" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Product Cart" ("id" varchar PRIMARY KEY NOT NULL, "cartId" varchar, "productId" varchar)`);
        await queryRunner.query(`CREATE TABLE "Cart" ("id" varchar PRIMARY KEY NOT NULL, "subTotal" integer NOT NULL, "quantity_total_itens" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "addressId" varchar, "ownerId" varchar, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" varchar NOT NULL, "employee_id" varchar NOT NULL, "client_id" varchar NOT NULL, "cart_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar)`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "cellphone" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "Stock Products" ("id" varchar PRIMARY KEY NOT NULL, "product_id" varchar NOT NULL, "sale_price" integer NOT NULL, "cost_price" integer NOT NULL, "category" varchar NOT NULL, "mark" varchar NOT NULL, "create_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_Product Cart" ("id" varchar PRIMARY KEY NOT NULL, "cartId" varchar, "productId" varchar, CONSTRAINT "FK_bcda01d332225067874df3ac3cc" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1de78eae783f689e393e0edd780" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Product Cart"("id", "cartId", "productId") SELECT "id", "cartId", "productId" FROM "Product Cart"`);
        await queryRunner.query(`DROP TABLE "Product Cart"`);
        await queryRunner.query(`ALTER TABLE "temporary_Product Cart" RENAME TO "Product Cart"`);
        await queryRunner.query(`CREATE TABLE "temporary_companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "addressId" varchar, "ownerId" varchar, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "adress" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_companies"("id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "addressId", "ownerId") SELECT "id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "addressId", "ownerId" FROM "companies"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`ALTER TABLE "temporary_companies" RENAME TO "companies"`);
        await queryRunner.query(`CREATE TABLE "temporary_orders" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" varchar NOT NULL, "employee_id" varchar NOT NULL, "client_id" varchar NOT NULL, "cart_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar, CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orders"("id", "status", "isBudget", "delivery_date", "employee_id", "client_id", "cart_id", "created_at", "updated_at", "clientId") SELECT "id", "status", "isBudget", "delivery_date", "employee_id", "client_id", "cart_id", "created_at", "updated_at", "clientId" FROM "orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "temporary_orders" RENAME TO "orders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME TO "temporary_orders"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" varchar PRIMARY KEY NOT NULL, "status" varchar NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" varchar NOT NULL, "employee_id" varchar NOT NULL, "client_id" varchar NOT NULL, "cart_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar)`);
        await queryRunner.query(`INSERT INTO "orders"("id", "status", "isBudget", "delivery_date", "employee_id", "client_id", "cart_id", "created_at", "updated_at", "clientId") SELECT "id", "status", "isBudget", "delivery_date", "employee_id", "client_id", "cart_id", "created_at", "updated_at", "clientId" FROM "temporary_orders"`);
        await queryRunner.query(`DROP TABLE "temporary_orders"`);
        await queryRunner.query(`ALTER TABLE "companies" RENAME TO "temporary_companies"`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cnpj" integer NOT NULL, "type" varchar NOT NULL, "address_id" varchar, "owner_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "addressId" varchar, "ownerId" varchar, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"))`);
        await queryRunner.query(`INSERT INTO "companies"("id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "addressId", "ownerId") SELECT "id", "name", "cnpj", "type", "address_id", "owner_id", "created_at", "updated_at", "addressId", "ownerId" FROM "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "temporary_companies"`);
        await queryRunner.query(`ALTER TABLE "Product Cart" RENAME TO "temporary_Product Cart"`);
        await queryRunner.query(`CREATE TABLE "Product Cart" ("id" varchar PRIMARY KEY NOT NULL, "cartId" varchar, "productId" varchar)`);
        await queryRunner.query(`INSERT INTO "Product Cart"("id", "cartId", "productId") SELECT "id", "cartId", "productId" FROM "temporary_Product Cart"`);
        await queryRunner.query(`DROP TABLE "temporary_Product Cart"`);
        await queryRunner.query(`DROP TABLE "Stock Products"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "Cart"`);
        await queryRunner.query(`DROP TABLE "Product Cart"`);
        await queryRunner.query(`DROP TABLE "Product"`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
