import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerService1723098185122 implements MigrationInterface {
    name = 'CustomerService1723098185122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_questions" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerName" character varying NOT NULL, "customerPhone" character varying NOT NULL, "customerEmail" character varying, "note" character varying, CONSTRAINT "PK_e6aff7c30208ae99b101f3c954f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_quote" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerName" character varying NOT NULL, "customerPhone" character varying NOT NULL, "customerEmail" character varying, "product" character varying NOT NULL, "detail" character varying, CONSTRAINT "PK_7704a311f09b4410b76e214f3ba" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "price_quote"`);
        await queryRunner.query(`DROP TABLE "customer_questions"`);
    }

}
