import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const bannerRepo = manager.getRepository("Banner");
  try {
    const banners = await bannerRepo.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: "Banner fetch failed" });
  }
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const bannerRepo = manager.getRepository("Banner");

    const banner = bannerRepo.create(req.body);

    await manager.transaction(async () => {
      await bannerRepo.save(banner);
    });

    res
      .status(201)
      .json({ message: "Banner created successfully", data: banner });
  } catch (error) {
    res.status(500).json({ error: "Banner create failed" });
  }
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const bannerRepo = manager.getRepository("Banner");
  try {
    await manager.transaction(async () => {
      await bannerRepo.delete(req.query.id);
    });
    res.status(200).json({ message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ error: req.body });
  }
};
