import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

interface Post {
  title: string;
  description?: string;
  content?: string;
  image?: string;
  categories?: string[];
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");
  try {
    const posts = await postRepo.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Post fetch failed" });
  }
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const postRepo = manager.getRepository("Post");
    const categoriesRepo = manager.getRepository("BlogCategory");

    const categoryId = req.query.category_id;
    const category = await categoriesRepo.findOne({
      where: { id: categoryId },
    });

    const post = postRepo.create(req.body);

    await manager.transaction(async () => {
      await postRepo.save(post);
    });

    res.status(201).json({ message: "Post created successfully", data: post });
  } catch (error) {
    res.status(500).json({ error: "Post create failed" });
  }
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");
  try {
    await manager.transaction(async () => {
      await postRepo.delete(req.query.id);
    });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};

// Edit post api
export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const postRepo = manager.getRepository("Post");
  const categoriesRepo = manager.getRepository("BlogCategory");
  try {
    const categoryId = req.query.category_id;
    const category = await categoriesRepo.findOne({
      where: { id: categoryId },
    });

    const post = await postRepo.findOne({
      where: { id: req.query.id },
    });

    postRepo.merge(post, req.body);

    await manager.transaction(async () => {
      await postRepo.save(post);
    });

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};
