import {
  BeforeInsert,
  Collection,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { BlogCategory } from "./blog-category";

@Entity()
export class Post extends BaseEntity {
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string | null;

  @Column({ type: "varchar", nullable: true })
  content: string | null;

  @Column({ type: "varchar", nullable: true })
  image: string | null;

  @Column({ type: "jsonb", nullable: true })
  metadata: object | null;

  @Column({ type: "varchar", nullable: true })
  category_id: string | null;

  @ManyToOne(() => BlogCategory, (blogCategory) => blogCategory.posts)
  @JoinColumn({ name: "category_id" })
  category: BlogCategory;

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "post");
  }
}
