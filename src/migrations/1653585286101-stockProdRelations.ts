import { MigrationInterface, QueryRunner } from "typeorm";

export class stockProdRelations1653585286101 implements MigrationInterface {
    name = 'stockProdRelations1653585286101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "status" character varying NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" character varying NOT NULL, "employee_id" character varying NOT NULL, "client_id" character varying NOT NULL, "cart_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2e71e930627351c26207d1a299d" UNIQUE ("email"), CONSTRAINT "UQ_fccef7ad26ce72df7926a421ef6" UNIQUE ("cpf"), CONSTRAINT "UQ_0e8bc99ff4fa2e5ec94dfe5e74e" UNIQUE ("cellphone"), CONSTRAINT "PK_0c6ea8a32565efcb512e572d61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "type" character varying NOT NULL, "address_id" character varying, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "ownerId" uuid, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emploees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5dee858fa2e82b07d9cc9c66aff" UNIQUE ("email"), CONSTRAINT "PK_82564ccb1e09957d580ffcc2a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_a9eb3c6b183961debec3a968f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "retail_price"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "wholesale_price"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "REL_3e141f02eb0f516b449c6315fb"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "product_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "sale_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "cost_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "mark" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "quantity_total_itens" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "quantity_total_itens"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "mark"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "cost_price"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "sale_price"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "REL_3e141f02eb0f516b449c6315fb" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "wholesale_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD "retail_price" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
        await queryRunner.query(`DROP TABLE "emploees"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
