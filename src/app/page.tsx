"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  Globe, 
  Zap, 
  Play, 
  ChevronDown, 
  Terminal, 
  LayoutDashboard,
  Loader2,
  Sparkles,
  Layers,
  History
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ArrayTraversal from "@/components/visualizers/ArrayTraversal";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleVisualize = async () => {
    if (!code.trim()) return;
    
    setIsVisualizing(true);
    setShowVisualizer(true);
    setIsLoadingAI(true);
    setExplanation("");

    try {
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const result = await response.json();
      
      if (result.success) {
        setExplanation(result.data.explanation);
      } else {
        setExplanation(`Error: ${result.error}`);
      }
    } catch (error) {
      setExplanation("Failed to connect to the visualization engine.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleComplete = () => {
    setIsVisualizing(false);
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Cpu size={22} />
            </div>
            <span className="font-outfit text-2xl font-black tracking-tighter">ALGO<span className="text-muted-foreground font-light">FORGE</span></span>
          </div>
          <div className="hidden items-center gap-10 text-sm font-semibold text-muted-foreground md:flex">
            <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Layers size={14}/> Library</Link>
            <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2"><History size={14}/> History</Link>
            <Link href="#" className="hover:text-primary transition-colors">Documentation</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Sign In</button>
            <button className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background hover:bg-foreground/90 transition-all active:scale-95 shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 py-12 space-y-12">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-left-4 duration-700">
            <Sparkles size={14} className="fill-current" />
            Next-Gen Algorithm Sandbox
          </div>
          <h1 className="font-outfit text-6xl font-extrabold leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Forge logic into <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">motion.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            A high-performance workspace to write, analyze, and visualize data structures with real-time AI reasoning.
          </p>
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Editor Column (5/12) */}
          <div className="xl:col-span-5 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl transition-all hover:border-white/20">
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/30" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                    <div className="h-3 w-3 rounded-full bg-green-500/30" />
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2" />
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground/80">
                    <Terminal size={16} />
                    <span>main.algo</span>
                  </div>
                </div>

                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl px-5 py-2 pr-10 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer hover:bg-white/10"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="c">C Language</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50" />
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your algorithm here...
function traverse(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}"
                  className="w-full min-h-[500px] bg-transparent p-10 font-mono text-base leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:outline-none resize-none selection:bg-primary/30"
                  spellCheck={false}
                />
                
                {/* Float Action Button */}
                <div className="absolute bottom-8 right-8">
                  <button 
                    onClick={handleVisualize}
                    disabled={isVisualizing || !code.trim()}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-lg font-black text-primary-foreground shadow-[0_20px_50px_rgba(var(--primary),0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                      isVisualizing ? "pr-8" : "hover:scale-105 hover:-translate-y-1"
                    )}
                  >
                    {isVisualizing ? (
                      <>Processing <Loader2 size={24} className="animate-spin" /></>
                    ) : (
                      <>FORGE <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Column (7/12) */}
          <div className="xl:col-span-7 space-y-8">
            {showVisualizer ? (
              <div className="animate-in fade-in zoom-in-95 duration-700 space-y-8">
                {/* Top Section: Visualization */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Globe size={18} />
                      </div>
                      <h2 className="font-outfit text-xl font-bold uppercase tracking-tight">Interactive Runtime</h2>
                    </div>
                    <button 
                      onClick={() => {
                        setShowVisualizer(false);
                        setExplanation("");
                      }}
                      className="text-xs font-bold text-muted-foreground hover:text-red-400 transition-colors uppercase tracking-widest"
                    >
                      Kill Process
                    </button>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-2xl overflow-hidden backdrop-blur-xl">
                    <ArrayTraversal 
                      isAnimating={isVisualizing} 
                      onComplete={handleComplete} 
                    />
                  </div>
                </div>

                {/* Bottom Section: AI Reasoning */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Zap size={18} fill="currentColor" />
                    </div>
                    <h3 className="font-outfit text-xl font-bold uppercase tracking-tight">AI Logic Synthesis</h3>
                  </div>
                  
                  <div className={cn(
                    "rounded-[2rem] border transition-all duration-700 min-h-[300px] p-10 backdrop-blur-xl relative overflow-hidden",
                    isLoadingAI ? "border-white/5 bg-white/[0.01]" : "border-primary/20 bg-primary/5"
                  )}>
                    {isLoadingAI ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                        <Loader2 size={40} className="text-primary animate-spin" />
                        <p className="text-muted-foreground font-mono text-sm animate-pulse">Deconstructing logic...<br/>Generating step-by-step reasoning</p>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans text-base md:text-lg">
                        {explanation || "Select an algorithm to begin synthesis."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] animate-in fade-in duration-1000">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/20 blur-[50px] animate-pulse" />
                  <LayoutDashboard size={80} className="relative text-white/10" />
                </div>
                <h3 className="font-outfit text-3xl font-bold text-white/40 mb-3">Workspace Idle</h3>
                <p className="text-muted-foreground max-w-sm">Write your algorithm in the forge to start the visualization and AI analysis engine.</p>
                <div className="mt-8 flex gap-3">
                  {["Bubble Sort", "Array Max", "Binary Search"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="w-full border-t border-white/5 py-12">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p className="font-medium">© 2026 ALGOFORGE. Designed for Performance.</p>
          <div className="flex gap-8 font-bold text-white/20 uppercase tracking-widest text-[10px]">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
