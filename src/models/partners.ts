import { 
  BeforeInsert, 
  Column, 
  Entity, 
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Partner extends BaseEntity {
  @Column({ type: "varchar", primary: true })
  id: string

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar" })
  image_url: string

  @BeforeInsert()
  beforeInsertActions() {
    this.id = generateEntityId(this.id, "partner")
  }
}
