import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");

  const limit = parseInt(req.query.limit as string) || 100;
  const offset = parseInt(req.query.offset as string) || 0;

  const posts = await postRepo.find({
    take: limit,
    skip: offset,
  });

  return res.json({
    posts: posts,
    limit: limit,
    offset: offset,
    count: posts.length,
  });
};
