import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function generateGroqExplanation(code: string, language: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set.");
  }

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
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "No explanation generated.";
  } catch (error: any) {
    console.error("Groq AI API Error:", error?.message || error);
    throw error;
  }
}
