import { MigrationInterface, QueryRunner } from "typeorm";

export class clientCartProductRelations1653332374065
  implements MigrationInterface
{
  name = "clientCartProductRelations1653332374065";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "cart_products_products" ("cartId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_9f96b1bce6e6963a289e3803835" PRIMARY KEY ("cartId", "productsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c5f8b003429a633008da82eb11" ON "cart_products_products" ("cartId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7da6114c85ab86bbb6c634cad4" ON "cart_products_products" ("productsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_c5f8b003429a633008da82eb111" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_products_products" ADD CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_7da6114c85ab86bbb6c634cad4d"`
    );
    await queryRunner.query(
      `ALTER TABLE "cart_products_products" DROP CONSTRAINT "FK_c5f8b003429a633008da82eb111"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7da6114c85ab86bbb6c634cad4"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c5f8b003429a633008da82eb11"`
    );
    await queryRunner.query(`DROP TABLE "cart_products_products"`);
  }
}
