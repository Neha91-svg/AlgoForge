import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateCodeExplanation(code: string, language: string) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI Explanation is unavailable because GEMINI_API_KEY is not set. Please add it to your .env.local file.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a kind, beginner-friendly computer science teacher. Your goal is to explain the following ${language} code to a student who is just starting out.
    
    Instead of just saying WHAT the code does, focus heavily on WHY each step is being taken:
    1. WHY use this specific variable or data structure?
    2. WHY is this loop necessary, and what would happen if we didn't have it?
    3. WHY are we checking this specific condition?
    
    Break it down into:
    - 💡 The "Big Idea" (The core concept)
    - 🚶 Step-by-Step Logic (The "Why" behind the path)
    - 🧠 Pro-Tip (A small piece of wisdom for the student)

    Code to explain:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Keep the tone encouraging, clear, and use simple analogies if helpful.
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
