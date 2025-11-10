"use client";
import { useEffect, useState } from "react";

interface PerfStats {
  fps: number;
  memory?: PerformanceMemory;
}
export function usePerformanceMonitor(): PerfStats {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState<PerformanceMemory>();

  useEffect(() => {
    let last = performance.now();
    let frames = 0;

    const loop = (now: number) => {
      frames++;
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
        if ((performance as any).memory) {
          setMemory((performance as any).memory);
        }
      }
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return { fps, memory };
}
