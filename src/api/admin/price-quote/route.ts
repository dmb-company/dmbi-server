import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const priceQuoteRepo = manager.getRepository("PriceQuote");
  try {
    const priceQuotes = await priceQuoteRepo.find();
    res.status(200).json(priceQuotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price quotes" });
  }
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const priceQuoteRepo = manager.getRepository("PriceQuote");
  try {
    await manager.transaction(async () => {
      await priceQuoteRepo.delete(req.query.id);
    });
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete price quote" });
  }
};
