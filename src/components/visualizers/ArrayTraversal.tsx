"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ArrayTraversalProps {
  data?: number[];
  speed?: number;
  targetValue?: number;
  isAnimating: boolean;
  onComplete?: () => void;
}

export default function ArrayTraversal({ 
  data = [45, 23, 89, 12, 67, 34, 90, 56], 
  speed = 1000,
  targetValue = 67,
  isAnimating,
  onComplete 
}: ArrayTraversalProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [decision, setDecision] = useState<{ active: boolean; result: boolean | null }>({ active: false, result: null });
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isAnimating) {
      let current = 0;
      setIsFound(false);
      
      const runStep = () => {
        if (current >= data.length) {
          setActiveIndex(-1);
          setDecision({ active: false, result: null });
          if (onComplete) onComplete();
          return;
        }

        setActiveIndex(current);
        setDecision({ active: true, result: null });

        // Phase 1: Checking
        timer = setTimeout(() => {
          const isMatch = data[current] === targetValue;
          setDecision({ active: true, result: isMatch });

          // Phase 2: Decision Result
          timer = setTimeout(() => {
            if (isMatch) {
              setIsFound(true);
              setDecision({ active: true, result: true });
              if (onComplete) onComplete();
            } else {
              setDecision({ active: false, result: null });
              current++;
              runStep();
            }
          }, speed / 2);
        }, speed / 2);
      };

      runStep();
    } else {
      setActiveIndex(-1);
      setDecision({ active: false, result: null });
      setIsFound(false);
    }

    return () => clearTimeout(timer);
  }, [isAnimating, data, targetValue, speed, onComplete]);

  return (
    <div className="flex flex-col gap-6 w-full p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
      {/* Visualization Canvas */}
      <div className="flex flex-wrap items-end justify-center gap-3 min-h-[240px] bg-black/20 rounded-2xl p-8 relative">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div 
              className={cn(
                "w-12 rounded-t-xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex items-end justify-center pb-4 text-xs font-bold relative",
                activeIndex === idx 
                  ? (decision.result === true ? "bg-green-500 h-[160px] shadow-[0_0_40px_rgba(34,197,94,0.4)] scale-110 z-10" : 
                     decision.result === false ? "bg-red-500 h-[160px] shadow-[0_0_40px_rgba(239,68,68,0.4)] scale-110 z-10" :
                     "bg-primary h-[160px] shadow-[0_0_40px_rgba(var(--primary),0.4)] scale-110 z-10")
                  : (isFound && data[idx] === targetValue ? "bg-green-500/50 h-[160px] opacity-100" : "bg-white/10 h-[100px] hover:bg-white/15 opacity-40")
              )}
              style={{ 
                height: `${Math.max(40, (value / Math.max(...data)) * 180)}px`,
              }}
            >
              {/* Decision Bubble */}
              {activeIndex === idx && decision.active && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 animate-in zoom-in slide-in-from-bottom-2 duration-300">
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border shadow-2xl transition-colors duration-300",
                    decision.result === null ? "bg-zinc-900 border-white/20 text-white" :
                    decision.result === true ? "bg-green-600 border-green-400 text-white animate-bounce" :
                    "bg-red-600 border-red-400 text-white"
                  )}>
                    {decision.result === null ? `Analyzing...` : 
                     decision.result === true ? "Branch: IF (True)" : "Branch: ELSE (False)"}
                  </div>
                </div>
              )}

              <span className={cn(
                "transition-all duration-500",
                activeIndex === idx ? "text-primary-foreground scale-125" : "text-muted-foreground"
              )}>
                {value}
              </span>
            </div>
            <span className={cn(
              "text-[10px] font-mono transition-all duration-500",
              activeIndex === idx ? "text-primary font-bold scale-110" : "text-muted-foreground/20"
            )}>
              idx:{idx}
            </span>
          </div>
        ))}
      </div>
      
      {/* Variable Tracker & Decision Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Variable Tracker</p>
          <div className="flex items-center gap-8 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">pointer <span className="text-primary italic">i</span></span>
              <span className="text-3xl font-black font-mono tracking-tighter">{activeIndex !== -1 ? activeIndex : '--'}</span>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">value <span className="text-primary italic">arr[i]</span></span>
              <span className="text-3xl font-black font-mono tracking-tighter">{activeIndex !== -1 ? data[activeIndex] : '--'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Decision Engine</p>
          <div className="flex items-center gap-3 mt-2">
            <div className={cn(
              "h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]",
              activeIndex !== -1 ? "bg-primary animate-pulse" : "bg-zinc-700"
            )} />
            <p className="text-sm font-bold tracking-tight">
              {activeIndex !== -1 
                ? (decision.result === true ? "Path Taken: IF BLOCK" : 
                   decision.result === false ? "Path Taken: ELSE BLOCK" : 
                   `evaluating (arr[i] == ${targetValue})`)
                : isFound ? "Target Found - Halting" : "Idle"}
            </p>
          </div>
          <div className="mt-2 font-mono text-[11px] bg-black/30 p-2 rounded-lg border border-white/5 text-muted-foreground">
            <span className="text-primary">if</span> ( <span className="text-zinc-100">{activeIndex !== -1 ? data[activeIndex] : "arr[i]"}</span> == <span className="text-zinc-100">{targetValue}</span> ) 
            <span className="ml-2 text-zinc-500">→ {decision.result === null ? "..." : String(decision.result).toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Control Footer */}
      <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
        <div className="flex gap-4">
          <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Logic: Linear Search</span>
          <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Speed: {speed}ms</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-widest">Active Runtime</span>
        </div>
      </div>
    </div>
  );
}
