import { MigrationInterface, QueryRunner } from "typeorm"

export class PartnerCreate1722423351994 implements MigrationInterface {
    name = 'PartnerCreate1722423351994';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "image_url" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_2d9a3f4a4f8a07c2f6f3d5b3e0b" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "partner"`);
    }

}
