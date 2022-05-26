import { MigrationInterface, QueryRunner } from "typeorm";

export class generateStockProductRelation1653526541828 implements MigrationInterface {
    name = 'generateStockProductRelation1653526541828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "retail_price" integer NOT NULL, "wholesale_price" integer NOT NULL, "category" character varying NOT NULL, "brand" character varying NOT NULL, "qty_available" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "REL_bf4c2d5e2a34a97dd2cd1c53cf" UNIQUE ("productId"), CONSTRAINT "PK_7a0cb9a59be9f5833a264cd1e60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "stockProductsId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_3d076d70341430247d8f008051b" UNIQUE ("stockProductsId")`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "company_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_products" ADD CONSTRAINT "FK_bf4c2d5e2a34a97dd2cd1c53cf5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3d076d70341430247d8f008051b" FOREIGN KEY ("stockProductsId") REFERENCES "stock_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3d076d70341430247d8f008051b"`);
        await queryRunner.query(`ALTER TABLE "stock_products" DROP CONSTRAINT "FK_bf4c2d5e2a34a97dd2cd1c53cf5"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "company_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_3d076d70341430247d8f008051b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stockProductsId"`);
        await queryRunner.query(`DROP TABLE "stock_products"`);
    }

}
