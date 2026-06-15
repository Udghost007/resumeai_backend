import { generateContent } from "../services/gemini.service.js";

export const generateAIContent = async (req, res) => {
  const { type, prompt } = req.body;

  if (!type || !prompt) {
    return res.status(400).json({ success: false, message: "type and prompt are required" });
  }

  const content = await generateContent({ type, prompt });
  res.json({ success: true, content });
};
