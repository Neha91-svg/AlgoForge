"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ArrayTraversalProps {
  data?: number[];
  speed?: number;
  isAnimating: boolean;
  onComplete?: () => void;
}

export default function ArrayTraversal({ 
  data = [45, 23, 89, 12, 67, 34, 90, 56], 
  speed = 500,
  isAnimating,
  onComplete 
}: ArrayTraversalProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isAnimating) {
      let current = 0;
      setActiveIndex(0);

      const step = () => {
        if (current < data.length - 1) {
          current++;
          setActiveIndex(current);
          timeoutId = setTimeout(step, speed);
        } else {
          setActiveIndex(-1);
          if (onComplete) onComplete();
        }
      };

      timeoutId = setTimeout(step, speed);
    } else {
      setActiveIndex(-1);
    }

    return () => clearTimeout(timeoutId);
  }, [isAnimating, data.length, speed, onComplete]);

  return (
    <div className="flex flex-col gap-6 w-full p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
      {/* Visualization Canvas */}
      <div className="flex flex-wrap items-end justify-center gap-3 min-h-[220px] bg-black/20 rounded-2xl p-6">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div 
              className={cn(
                "w-12 rounded-t-xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex items-end justify-center pb-4 text-xs font-bold",
                activeIndex === idx 
                  ? "bg-primary h-[160px] shadow-[0_0_40px_rgba(var(--primary),0.4)] scale-110 z-10" 
                  : "bg-white/10 h-[100px] hover:bg-white/15 opacity-50"
              )}
              style={{ 
                height: `${Math.max(40, (value / Math.max(...data)) * 180)}px`,
                backgroundColor: activeIndex === idx ? 'var(--primary)' : undefined
              }}
            >
              <span className={cn(
                "transition-colors duration-500",
                activeIndex === idx ? "text-primary-foreground scale-125" : "text-muted-foreground"
              )}>
                {value}
              </span>
            </div>
            <span className={cn(
              "text-[10px] font-mono transition-all duration-500",
              activeIndex === idx ? "text-primary font-bold scale-110" : "text-muted-foreground/30"
            )}>
              idx:{idx}
            </span>
          </div>
        ))}
      </div>
      
      {/* Variable Tracker & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Variable Tracker</p>
          <div className="flex items-center gap-6 mt-1">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">index <span className="font-mono text-primary italic">i</span></span>
              <span className="text-2xl font-bold font-mono">{activeIndex !== -1 ? activeIndex : '--'}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">value <span className="font-mono text-primary italic">arr[i]</span></span>
              <span className="text-2xl font-bold font-mono">{activeIndex !== -1 ? data[activeIndex] : '--'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Operation</p>
          <div className="flex items-center gap-3 mt-1">
            <div className={cn(
              "h-2 w-2 rounded-full",
              activeIndex !== -1 ? "bg-primary animate-pulse" : "bg-zinc-600"
            )} />
            <p className="text-sm font-medium">
              {activeIndex !== -1 
                ? `Visiting element ${data[activeIndex]} at index ${activeIndex}` 
                : 'Traversal Complete'}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono mt-1">
            {activeIndex !== -1 ? `Array[${activeIndex}] = ${data[activeIndex]}` : 'Waiting for input...'}
          </p>
        </div>
      </div>

      {/* Logic Summary */}
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4">
          <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-muted-foreground">SPACE: O(1)</span>
          <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-muted-foreground">TIME: O(N)</span>
        </div>
        <span className="text-[10px] text-muted-foreground italic">Animating at {speed}ms/step</span>
      </div>
    </div>
  );
}
