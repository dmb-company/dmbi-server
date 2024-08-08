import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class CustomerQuestions extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  customerName: string;

  @Column({ type: "varchar", nullable: false })
  customerPhone: string;

  @Column({ type: "varchar", nullable: true })
  customerEmail: string;

  @Column({ type: "varchar", nullable: true })
  note: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "customer-questions");
  }
}
