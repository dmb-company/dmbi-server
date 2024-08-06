import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { Post } from "./post";

@Entity()
export class BlogCategory extends BaseEntity {
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string | null;

  @Column({ type: "varchar", nullable: true })
  image: string | null;

  @Column({ type: "jsonb", nullable: true })
  metadata: object | null;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "bcat");
  }
}
