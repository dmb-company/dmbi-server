import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id;
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");
  try {
    const post = await postRepo.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Post fetch failed" });
  }
};
