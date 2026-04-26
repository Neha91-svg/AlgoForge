import { NextResponse } from "next/server";
import { generateCodeExplanation } from "@/lib/gemini";
import { generateGroqExplanation } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interests } = body;

    if (!interests || interests.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please provide your interests." },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert career counselor. Based on the user's interests: "${interests}", 
      provide 3-5 specific career suggestions. For each suggestion, include:
      1. Career Title
      2. Required Core Skills
      3. A concise 6-month roadmap to get started.
      
      Format the output as structured JSON so I can render it. 
      The JSON should be an array of objects: 
      [{ "title": "...", "skills": ["...", "..."], "roadmap": ["Month 1: ...", "Month 2: ..."] }]
      
      IMPORTANT: Return ONLY the JSON array, no extra text.
    `;

    // Reusing the AI logic but with a different prompt
    // We'll use Gemini for this as it's good with JSON formatting
    let suggestions = [];
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const result = await response.json();
      const text = result.candidates[0].content.parts[0].text;
      const jsonString = text.replace(/```json|```/g, "").trim();
      suggestions = JSON.parse(jsonString);
    } catch (error) {
      console.error("Career API Error:", error);
      return NextResponse.json({ success: false, error: "AI failed to generate suggestions." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: suggestions });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
