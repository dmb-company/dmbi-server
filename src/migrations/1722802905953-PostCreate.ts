import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreate1722802905953 implements MigrationInterface {
    name = 'PostCreate1722802905953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "content" character varying, "image" character varying, "metadata" jsonb, "category_id" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_category" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "image" character varying, "metadata" jsonb, CONSTRAINT "PK_32b67ddf344608b5c2fb95bc90c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "blog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`);
        await queryRunner.query(`DROP TABLE "blog_category"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
