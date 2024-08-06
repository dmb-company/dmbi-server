import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const categoriesRepo = manager.getRepository("BlogCategory");

  res.json({
    blogCategories: await categoriesRepo.find(),
  });
};
