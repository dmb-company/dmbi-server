import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Banner extends BaseEntity {
  @Column({ type: "varchar", primary: true })
  id: string;

  @Column({ type: "varchar" })
  image_pc: string;

  @Column({ type: "varchar" })
  image_mobile: string;

  @Column({ type: "varchar" })
  product_id: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "banner");
  }
}
