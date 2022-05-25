import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1653488329711 implements MigrationInterface {
    name = 'firstMigration1653488329711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "company_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Product Cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cartId" uuid, "productId" uuid, CONSTRAINT "PK_9ba5795622f91d0aa3f393bf3e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, "quantity_total_itens" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "postalcode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" integer NOT NULL, "cellphone" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c6ea8a32565efcb512e572d61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "status" character varying NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" character varying NOT NULL, "employee_id" character varying NOT NULL, "client_id" character varying NOT NULL, "cart_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cellphone" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" integer NOT NULL, "type" character varying NOT NULL, "address_id" character varying, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "ownerId" uuid, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Stock Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "sale_price" integer NOT NULL, "cost_price" integer NOT NULL, "category" character varying NOT NULL, "mark" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_db351832dd7cc05a17a9a97a032" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_clients_clients" ("companiesId" uuid NOT NULL, "clientsId" uuid NOT NULL, CONSTRAINT "PK_5094d8ac8e31e316a86b05d2a96" PRIMARY KEY ("companiesId", "clientsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d51ef10a9c2dded0c35e9d99e7" ON "companies_clients_clients" ("companiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_150a236a1d1d1f4572979339d8" ON "companies_clients_clients" ("clientsId") `);
        await queryRunner.query(`ALTER TABLE "Product Cart" ADD CONSTRAINT "FK_bcda01d332225067874df3ac3cc" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product Cart" ADD CONSTRAINT "FK_1de78eae783f689e393e0edd780" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_clients_clients" ADD CONSTRAINT "FK_d51ef10a9c2dded0c35e9d99e70" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_clients_clients" ADD CONSTRAINT "FK_150a236a1d1d1f4572979339d86" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_clients_clients" DROP CONSTRAINT "FK_150a236a1d1d1f4572979339d86"`);
        await queryRunner.query(`ALTER TABLE "companies_clients_clients" DROP CONSTRAINT "FK_d51ef10a9c2dded0c35e9d99e70"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "Product Cart" DROP CONSTRAINT "FK_1de78eae783f689e393e0edd780"`);
        await queryRunner.query(`ALTER TABLE "Product Cart" DROP CONSTRAINT "FK_bcda01d332225067874df3ac3cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_150a236a1d1d1f4572979339d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d51ef10a9c2dded0c35e9d99e7"`);
        await queryRunner.query(`DROP TABLE "companies_clients_clients"`);
        await queryRunner.query(`DROP TABLE "Stock Products"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "Product Cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
