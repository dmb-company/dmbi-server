import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class PriceQuote extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  customerName: string;

  @Column({ type: "varchar", nullable: false })
  customerPhone: string;

  @Column({ type: "varchar", nullable: true })
  customerEmail: string;

  @Column({ type: "varchar", nullable: false })
  product: string;

  @Column({ type: "varchar", nullable: true })
  detail: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "price-quote");
  }
}
