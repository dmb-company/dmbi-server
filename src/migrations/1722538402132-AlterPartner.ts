import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterPartner1722538402132 implements MigrationInterface {
    name = 'AlterPartner1722538402132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // change type of id -> varchar
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "PK_2d9a3f4a4f8a07c2f6f3d5b3e0b"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "PK_2d9a3f4a4f8a07c2f6f3d5b3e0b" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
