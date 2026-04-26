import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateCodeExplanation(code: string, language: string) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI Explanation is unavailable because GEMINI_API_KEY is not set. Please add it to your .env.local file.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert computer science tutor. Analyze the following ${language} code and provide a concise, step-by-step explanation.
    Focus on:
    1. Why specific loops or conditions are used.
    2. The time and space complexity.
    3. What the code is trying to achieve.

    Code:
    \`\`\`${language}
    ${code}
    \`\`\`

    Format the response as a simple markdown explanation.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini AI API Error:", error?.message || error);
    return `AI Explanation is temporarily unavailable. (Reason: ${error?.message || "Unknown API Error"})`;
  }
}
