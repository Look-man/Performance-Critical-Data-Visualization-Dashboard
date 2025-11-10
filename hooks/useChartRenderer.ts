"use client";
import { useEffect, useRef } from "react";
export function useChartRenderer(
  draw: (ctx: CanvasRenderingContext2D) => void,
  deps: any[] = []
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;

    const render = () => {
      if (!active) return;
      draw(ctx);
      frameRef.current = requestAnimationFrame(render);
    };
    frameRef.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, deps); 

  return canvasRef;
}
