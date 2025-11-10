"use client";
import React, { useEffect, useRef, memo } from "react";
import { useData } from "../providers/DataProvider";

interface ScatterPlotProps {
  width?: number;
  height?: number;
  color?: string;
  radius?: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = memo(
  ({ width = 800, height = 400, color = "#ff9100", radius = 2 }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { data } = useData();

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = color;
      const step = Math.ceil(data.length / 5000); 
      for (let i = 0; i < data.length; i += step) {
        const { x, y } = data[i];
        ctx.beginPath();
        ctx.arc(x, height - y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }, [data, width, height, color, radius]);

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          background: "#0d0d0d",
          borderRadius: 8,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
);

ScatterPlot.displayName = "ScatterPlot";
export default ScatterPlot;
