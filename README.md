# ⚒️ AlgoForge

**AlgoForge** is a premium, AI-powered workspace designed for engineers and students to forge their logic into motion. It combines high-performance algorithm visualization with real-time AI reasoning to provide a deep, pedagogical understanding of data structures and code execution.

![AlgoForge Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070)

## 🚀 Features

### 1. Interactive DSA Visualizer
*   **Real-time Animation**: Watch your arrays, loops, and conditions come to life with hardware-accelerated transitions.
*   **Decision Engine**: Visualizes `if-else` branches with dynamic highlighting (Green for True, Red for False).
*   **Variable Tracker**: Monitor index pointers and array values at every step of execution.
*   **Multi-Language Support**: Support for **JavaScript**, **C++**, and **C**.

### 2. AI Reasoning (The Teacher)
*   **Beginner-Friendly Explanations**: Powered by **Gemini 1.5 Flash** and **Groq (Llama 3.3)**.
*   **The "Why" Behind the Code**: Focuses on why specific loops, conditions, and variables are used, not just what they do.
*   **Logic Synthesis**: Deconstructs complex algorithms into simple analogies and step-by-step reasoning.

### 3. AI Career Forge
*   **Interest-Based Roadmaps**: Describe your interests and get AI-architected career paths.
*   **Skill Mapping**: Identifies the core technologies you need to master.
*   **6-Month Strategic Guide**: Provides a monthly milestone plan to transition into your dream role.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **AI Engines**: [Google Gemini SDK](https://ai.google.dev/) & [Groq SDK](https://groq.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animation**: Custom Framer-like transitions with standard CSS hardware acceleration.

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Neha91-svg/AlgoForge.git
cd AlgoForge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
```env
GEMINI_API_KEY=your_google_ai_key
GROQ_API_KEY=your_groq_api_key (optional fallback)
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the forge in action.

## 🌐 Deployment

AlgoForge is designed to be deployed seamlessly on **Vercel**.

1.  Connect your GitHub repository to Vercel.
2.  Add `GEMINI_API_KEY` to the **Environment Variables** in the Vercel project settings.
3.  Deploy!

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Designed with ❤️ for the next generation of engineers.*
