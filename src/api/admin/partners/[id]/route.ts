import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id;
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const partnerRepo = manager.getRepository("Partner");

    return res.json(
      await partnerRepo.findOne({
        where: {
          id,
        },
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to get partner" });
  }
};
