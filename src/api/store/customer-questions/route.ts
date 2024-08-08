import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const customerQuestionsRepo = manager.getRepository("CustomerQuestions");

  try {
    const priceQuote = customerQuestionsRepo.create(req.body);
    await customerQuestionsRepo.save(priceQuote);

    res.status(201).json(priceQuote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create price quote" });
  }
};
