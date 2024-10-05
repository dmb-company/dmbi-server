import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id;
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const postRepo = manager.getRepository("Post");

    return res.json(
      await postRepo.findOne({
        where: {
          id,
        },
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to get partner" });
  }
};
