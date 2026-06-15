import { Router } from "express";
import { generateAIContent } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/generate", protect, generateAIContent);

export default router;
