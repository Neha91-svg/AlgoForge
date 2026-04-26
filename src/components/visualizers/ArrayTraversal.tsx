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
    <div className="flex flex-col items-center gap-8 w-full p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
      <div className="flex flex-wrap items-end justify-center gap-3 min-h-[200px]">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div 
              className={cn(
                "w-12 rounded-t-xl transition-all duration-300 ease-out flex items-end justify-center pb-4 text-xs font-bold",
                activeIndex === idx 
                  ? "bg-primary h-[160px] shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-110" 
                  : "bg-white/10 h-[100px] hover:bg-white/20"
              )}
              style={{ 
                height: `${Math.max(40, (value / Math.max(...data)) * 180)}px`,
                backgroundColor: activeIndex === idx ? 'var(--primary)' : undefined
              }}
            >
              <span className={cn(
                "transition-colors",
                activeIndex === idx ? "text-primary-foreground" : "text-muted-foreground"
              )}>
                {value}
              </span>
            </div>
            <span className={cn(
              "text-[10px] font-mono transition-colors",
              activeIndex === idx ? "text-primary font-bold" : "text-muted-foreground/50"
            )}>
              idx:{idx}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground bg-white/5 px-6 py-2 rounded-full border border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>Status: {activeIndex !== -1 ? `Accessing Index ${activeIndex}` : 'Idle'}</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <span>Complexity: O(N)</span>
      </div>
    </div>
  );
}
