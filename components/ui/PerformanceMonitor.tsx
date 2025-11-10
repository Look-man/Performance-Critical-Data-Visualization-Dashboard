"use client";
import React, { useEffect, useState, memo } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

const PerformanceMonitor: React.FC = memo(() => {
  const { fps, memory } = usePerformanceMonitor();
  const [color, setColor] = useState("#22c55e");

  useEffect(() => {
    if (fps < 30) setColor("#ef4444");
    else if (fps < 50) setColor("#f59e0b");
    else setColor("#22c55e");
  }, [fps]);

  return (
    <div className="fixed bottom-4 right-4 bg-[#1a1a1a] px-4 py-2 rounded-2xl shadow-lg border border-[#333] text-sm text-gray-300 flex flex-col gap-1">
      <span>
        FPS: <span style={{ color }}>{fps.toFixed(1)}</span>
      </span>
      {memory && (
        <span>
          Mem:{" "}
          <span className="text-gray-400">
            {(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB
          </span>
        </span>
      )}
    </div>
  );
});

PerformanceMonitor.displayName = "PerformanceMonitor";
export default PerformanceMonitor;
