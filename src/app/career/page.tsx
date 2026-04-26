"use client";

import { useState } from "react";
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Map, 
  Search,
  Loader2,
  ChevronRight,
  Zap,
  Target
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CareerSuggestion {
  title: string;
  skills: string[];
  roadmap: string[];
}

export default function CareerPage() {
  const [interests, setInterests] = useState("");
  const [suggestions, setSuggestions] = useState<CareerSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    if (!interests.trim() || interests.length < 3) {
      setError("Please describe your interests more clearly.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSuggestions(result.data);
      } else {
        setError(result.error || "Failed to get suggestions.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Cpu size={22} />
            </div>
            <span className="font-outfit text-2xl font-black tracking-tighter uppercase">AlgoForge</span>
          </Link>
          <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            DSA Visualizer
          </Link>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles size={14} className="fill-current" />
            AI Career Forge
          </div>
          <h1 className="font-outfit text-5xl md:text-7xl font-extrabold tracking-tight">
            Forge your <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">future.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us what you love, and our AI will architect your ideal career path with a detailed 6-month roadmap.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative group max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-[2rem] bg-zinc-900 border border-white/10 shadow-2xl">
            <div className="flex-1 flex items-center gap-4 px-4 w-full">
              <Search className="text-muted-foreground" size={24} />
              <input 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGetSuggestions()}
                placeholder="e.g. Building sleek UIs, solving complex math problems, or security..."
                className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-zinc-600"
              />
            </div>
            <button 
              onClick={handleGetSuggestions}
              disabled={isLoading}
              className="w-full md:w-auto flex items-center justify-center gap-3 rounded-2xl bg-primary px-10 py-4 font-black text-primary-foreground shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "EXPLORE"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-center text-sm font-bold text-red-400 animate-in fade-in slide-in-from-top-2">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {suggestions.map((career, idx) => (
              <div key={idx} className="group flex flex-col h-full rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] hover:border-primary/30">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <Briefcase size={28} />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                    ))}
                  </div>
                </div>
                
                <h3 className="font-outfit text-3xl font-black mb-6">{career.title}</h3>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {career.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-zinc-800 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-6">
                  <div className="h-px w-full bg-white/5" />
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Target size={14} className="text-primary" />
                      Strategic Roadmap
                    </div>
                    <div className="space-y-4">
                      {career.roadmap.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            {i < career.roadmap.length - 1 && <div className="h-full w-px bg-white/10" />}
                          </div>
                          <p className="text-sm text-muted-foreground leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 duration-500">
                    Deep Dive <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State / Tips */}
        {!isLoading && suggestions.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
            {[
              { icon: <Zap />, text: "Enter specific interests like 'Cloud Security' for better results." },
              { icon: <Target />, text: "We suggest core skills to master first." },
              { icon: <Map />, text: "Follow the 6-month roadmap to switch careers." }
            ].map((tip, i) => (
              <div key={i} className="p-6 rounded-[2rem] border border-white/10 bg-white/[0.01] flex flex-col items-center text-center gap-4">
                <div className="text-primary">{tip.icon}</div>
                <p className="text-xs font-medium leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-muted-foreground font-medium">
          © 2026 ALGOFORGE CAREERS. Powered by Gemini AI.
        </div>
      </footer>
    </div>
  );
}
