import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

interface Post {
  title: string;
  description?: string;
  content?: string;
  image?: string;
  categories?: string[];
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const categoriesRepo = manager.getRepository("BlogCategory");
    const category = categoriesRepo.create(req.body);

    await manager.transaction(async () => {
      await categoriesRepo.save(category);
    });

    res
      .status(201)
      .json({ message: "Blog Category created successfully", data: category });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const categoriesRepo = manager.getRepository("BlogCategory");
  const postRepo = manager.getRepository("Post");

  try {
    await manager.transaction(async () => {
      // update the posts that have this category, set category_id to null
      const posts = await postRepo.find({
        where: { category_id: req.query.id },
      });
      for (const post of posts) {
        post.category_id = null;
        await postRepo.save(post);
      }
      await categoriesRepo.delete(req.query.id);
    });
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const categoriesRepo = manager.getRepository("BlogCategory");
  try {
    const category = await categoriesRepo.findOne({
      where: { id: req.query.id },
    });

    categoriesRepo.merge(category, req.body);
    await manager.transaction(async () => {
      await categoriesRepo.save(category);
    });
    res.status(200).json({ message: "Category updated", data: category });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};
