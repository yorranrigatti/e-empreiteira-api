import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653599473878 implements MigrationInterface {
    name = 'initialMigration1653599473878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying, "postalcode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_owner" ("id" uuid NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2e71e930627351c26207d1a299d" UNIQUE ("email"), CONSTRAINT "UQ_fccef7ad26ce72df7926a421ef6" UNIQUE ("cpf"), CONSTRAINT "UQ_0e8bc99ff4fa2e5ec94dfe5e74e" UNIQUE ("cellphone"), CONSTRAINT "PK_0c6ea8a32565efcb512e572d61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "role" character varying NOT NULL, "company_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "type" character varying NOT NULL, "address_id" character varying, "owner_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "ownerId" uuid, CONSTRAINT "REL_2bb6583d4cf35554e19694c8a9" UNIQUE ("addressId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "sale_price" integer NOT NULL, "cost_price" integer NOT NULL, "category" character varying NOT NULL, "brand" character varying NOT NULL, "expiration_date" character varying NOT NULL, "quantity" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_7a0cb9a59be9f5833a264cd1e60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "company_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" character varying NOT NULL, "product_id" character varying NOT NULL, "cartId" uuid, "productId" uuid, CONSTRAINT "PK_a9eb3c6b183961debec3a968f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, "quantity_total_itens" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "status" character varying NOT NULL, "isBudget" boolean NOT NULL, "delivery_date" character varying NOT NULL, "employee_id" character varying NOT NULL, "client_id" character varying NOT NULL, "cart_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, "emploeeId" uuid, "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cellphone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "adressId" uuid, "cartId" uuid, CONSTRAINT "REL_1eb3fb3f46649cced8e9a8c95d" UNIQUE ("adressId"), CONSTRAINT "REL_3e141f02eb0f516b449c6315fb" UNIQUE ("cartId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_c7b030a4514a003d9d8d31a812b" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39" FOREIGN KEY ("ownerId") REFERENCES "company_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD CONSTRAINT "FK_bf4c2d5e2a34a97dd2cd1c53cf5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_47942e65af8e4235d4045515f05" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_b636d2066a50d84f73597f168df" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_64a269165a9bc397d9a0a6d5299" FOREIGN KEY ("emploeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8" FOREIGN KEY ("adressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1eb3fb3f46649cced8e9a8c95d8"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_64a269165a9bc397d9a0a6d5299"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_b636d2066a50d84f73597f168df"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_07c8f3b3b939faaa002db85a0c3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_47942e65af8e4235d4045515f05"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP CONSTRAINT "FK_bf4c2d5e2a34a97dd2cd1c53cf5"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6dcdcbb7d72f64602307ec4ab39"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_2bb6583d4cf35554e19694c8a9b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c7b030a4514a003d9d8d31a812b"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "stock_products"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "company_owner"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
