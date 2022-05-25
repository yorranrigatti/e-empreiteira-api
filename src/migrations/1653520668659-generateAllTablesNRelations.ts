import { MigrationInterface, QueryRunner } from "typeorm";

export class generateAllTablesNRelations1653520668659 implements MigrationInterface {
    name = 'generateAllTablesNRelations1653520668659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "postalcode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2e71e930627351c26207d1a299d" UNIQUE ("email"), CONSTRAINT "UQ_fccef7ad26ce72df7926a421ef6" UNIQUE ("cpf"), CONSTRAINT "UQ_0e8bc99ff4fa2e5ec94dfe5e74e" UNIQUE ("cellphone"), CONSTRAINT "PK_0c6ea8a32565efcb512e572d61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" integer NOT NULL, "type" character varying NOT NULL, "address_id" character varying, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "ownerId" uuid, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sale_price" integer NOT NULL, "cost_price" integer NOT NULL, "category" character varying NOT NULL, "brand" character varying NOT NULL, "qty_available" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7a0cb9a59be9f5833a264cd1e60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, "stockProductId" uuid, CONSTRAINT "REL_72529ec399662c1564cdc3d144" UNIQUE ("stockProductId"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, "quantity_total_itens" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "status" character varying NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" character varying NOT NULL, "employee_id" character varying NOT NULL, "client_id" character varying NOT NULL, "cart_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cellphone" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_products" ("cartId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_9f96b1bce6e6963a289e3803835" PRIMARY KEY ("cartId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5f8b003429a633008da82eb11" ON "cart_products_products" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7da6114c85ab86bbb6c634cad4" ON "cart_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_47942e65af8e4235d4045515f05" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_72529ec399662c1564cdc3d1447" FOREIGN KEY ("stockProductId") REFERENCES "stock_products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_c5f8b003429a633008da82eb111" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d"`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_c5f8b003429a633008da82eb111"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_72529ec399662c1564cdc3d1447"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_47942e65af8e4235d4045515f05"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da6114c85ab86bbb6c634cad4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5f8b003429a633008da82eb11"`);
        await queryRunner.query(`DROP TABLE "cart_products_products"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "stock_products"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
