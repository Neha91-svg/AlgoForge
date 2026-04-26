"use client";

import { useState } from "react";
import { ArrowRight, Code2, Cpu, Globe, Zap, Play, ChevronDown, Terminal, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ArrayTraversal from "@/components/visualizers/ArrayTraversal";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleVisualize = () => {
    setIsVisualizing(true);
    setShowVisualizer(true);
    // The visualizer handles its own completion state, but we can set a timer if needed
  };

  const handleComplete = () => {
    setIsVisualizing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-20">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Cpu size={20} />
            </div>
            <span className="font-outfit text-xl font-bold tracking-tight">Algo<span className="text-muted-foreground">Forge</span></span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link href="#" className="transition-colors hover:text-primary">Algorithms</Link>
            <Link href="#" className="transition-colors hover:text-primary">Structures</Link>
            <Link href="#" className="transition-colors hover:text-primary">Docs</Link>
          </div>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="max-w-4xl font-outfit text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Forge your <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">algorithms.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Paste your code, select your language, and watch your logic come to life in a real-time visualization environment.
          </p>
        </div>
      </section>

      {/* Editor Section */}
      <section className="w-full max-w-5xl px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-sm">
          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Terminal size={14} />
                <span>main.algo</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer hover:bg-white/10"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="cpp">C++</option>
                  <option value="c">C Language</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Editor Body */}
          <div className="relative group">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your code here...
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Visualization logic will appear here
  }
}"
              className="w-full min-h-[400px] bg-transparent p-8 font-mono text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none"
              spellCheck={false}
            />
            
            {/* Visualizer Button Overlay */}
            <div className="absolute bottom-8 right-8">
              <button 
                onClick={handleVisualize}
                disabled={isVisualizing || !code.trim()}
                className={cn(
                  "flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                  isVisualizing ? "animate-pulse" : "hover:scale-105"
                )}
              >
                {isVisualizing ? (
                  <>Initializing... <Zap size={20} className="animate-spin" /></>
                ) : (
                  <>Visualize <Play size={20} fill="currentColor" /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Area */}
        {showVisualizer && (
          <div className="mt-12 animate-in fade-in zoom-in duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={20} className="text-primary" />
                <h2 className="font-outfit text-xl font-bold">Visualization Output</h2>
              </div>
              <button 
                onClick={() => setShowVisualizer(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close Output
              </button>
            </div>
            
            <ArrayTraversal 
              isAnimating={isVisualizing} 
              onComplete={handleComplete} 
            />
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { label: "Memory Usage", value: "0.4 MB", icon: <Cpu size={16} /> },
            { label: "Step Count", value: "0 Steps", icon: <ArrowRight size={16} /> },
            { label: "Time Complexity", value: "O(n²)", icon: <Zap size={16} /> }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full border-t border-white/5 py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 AlgoForge. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
