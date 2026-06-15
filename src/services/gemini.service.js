import { GoogleGenerativeAI } from "@google/generative-ai";

const buildPrompt = (type, prompt) => {
  const prompts = {
    summary: "Generate a professional resume summary. Keep it concise and ATS friendly.",
    experience: "Generate resume work experience bullets with measurable impact.",
    project: "Generate a resume project description with technologies and outcomes.",
    skills: "Suggest relevant resume skills grouped by category.",
  };

  return `${prompts[type] || "Generate resume content."}\n\nUser prompt:\n${prompt}`;
};

export const generateContent = async ({ type, prompt }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(buildPrompt(type, prompt));

  return result.response.text();
};
