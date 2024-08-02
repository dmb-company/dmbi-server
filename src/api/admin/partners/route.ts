import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import PartnerService from 'src/services/partner';

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const partnerService: PartnerService = req.scope.resolve("partnerService");
    const manager: EntityManager = req.scope.resolve("manager")

    await manager.transaction(async () => {
      await partnerService.create(req.body)
    })

    res.status(201).json({ message: req.body })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create partner' })
  }
}

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const partnerService: PartnerService = req.scope.resolve("partnerService");
    const manager: EntityManager = req.scope.resolve("manager")

    await manager.transaction(async () => {
      console.log(req)
      await partnerService.delete(req.query.id)
    })

    res.status(200).json({ message: 'Partner deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete partner' })
  }
}
