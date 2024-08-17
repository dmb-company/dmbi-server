import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager = req.scope.resolve("manager");
  const bannerRepo = manager.getRepository("Banner");
  try {
    const banners = await bannerRepo.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: "Banner fetch failed" });
  }
};
