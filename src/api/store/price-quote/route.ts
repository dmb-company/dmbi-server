import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const priceQuoteRepo = manager.getRepository("PriceQuote");

  try {
    const priceQuote = priceQuoteRepo.create(req.body);
    await priceQuoteRepo.save(priceQuote);

    res.status(201).json(priceQuote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create price quote" });
  }
};
