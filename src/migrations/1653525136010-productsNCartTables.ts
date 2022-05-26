import { MigrationInterface, QueryRunner } from "typeorm";

export class productsNCartTables1653525136010 implements MigrationInterface {
    name = 'productsNCartTables1653525136010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "postalcode" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "company_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cellphone" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, CONSTRAINT "REL_3e141f02eb0f516b449c6315fb" UNIQUE ("cartId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_products" ("cartId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_9f96b1bce6e6963a289e3803835" PRIMARY KEY ("cartId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5f8b003429a633008da82eb11" ON "cart_products_products" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7da6114c85ab86bbb6c634cad4" ON "cart_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_c5f8b003429a633008da82eb111" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d"`);
        await queryRunner.query(`ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_c5f8b003429a633008da82eb111"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_3e141f02eb0f516b449c6315fbf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da6114c85ab86bbb6c634cad4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5f8b003429a633008da82eb11"`);
        await queryRunner.query(`DROP TABLE "cart_products_products"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
