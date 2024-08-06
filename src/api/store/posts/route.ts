import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");

  return res.json({
    posts: await postRepo.find(),
  });
};
