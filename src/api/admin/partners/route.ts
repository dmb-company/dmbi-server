import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import PartnerService from "src/services/partner";
import { Partner } from "src/models/partners";

/* GET PARTNERS */
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const partnerRepo = manager.getRepository("Partner");

  return res.json(await partnerRepo.find());
};

/* CREATE PARTNER */
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const partnerService: PartnerService = req.scope.resolve("partnerService");
    const manager: EntityManager = req.scope.resolve("manager");

    await manager.transaction(async () => {
      await partnerService.create(req.body);
    });

    res.status(201).json({ message: req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner" });
  }
};

/* DELETE PARTNER */
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const partnerService: PartnerService = req.scope.resolve("partnerService");
    const manager: EntityManager = req.scope.resolve("manager");

    await manager.transaction(async () => {
      await partnerService.delete(req.query.id);
    });

    res.status(200).json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
};
