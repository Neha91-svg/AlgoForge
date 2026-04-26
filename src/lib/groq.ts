import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function generateGroqExplanation(code: string, language: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set.");
  }

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
