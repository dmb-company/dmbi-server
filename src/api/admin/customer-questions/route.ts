import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const customerQuestionsRepo = manager.getRepository("CustomerQuestions");
  try {
    const customerQuestions = await customerQuestionsRepo.find();
    res.status(200).json(customerQuestions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price quotes" });
  }
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve("manager");
  const customerQuestionsRepo = manager.getRepository("CustomerQuestions");
  try {
    await manager.transaction(async () => {
      await customerQuestionsRepo.delete(req.query.id);
    });
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete price quote" });
  }
};
