"use client";
import React, { useEffect, useRef, useMemo, memo } from "react";
import { useData } from "../providers/DataProvider";

interface BarChartProps {
  width?: number;
  height?: number;
  color?: string;
  bins?: number;
}

const BarChart: React.FC<BarChartProps> = memo(
  ({ width = 800, height = 400, color = "#2196f3", bins = 50 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { data } = useData();

    const histogram = useMemo(() => {
      if (data.length === 0) return [];

      const yValues = data.map((d) => d.y);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);
      const binSize = (maxY - minY) / bins;

      const bucketCounts = new Array(bins).fill(0);
      for (const y of yValues) {
        const index = Math.min(bins - 1, Math.floor((y - minY) / binSize));
        bucketCounts[index]++;
      }

      return bucketCounts.map((count, i) => ({
        x: (i * width) / bins,
        y: count,
      }));
    }, [data, bins, width]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const maxCount = Math.max(...histogram.map((b) => b.y), 1);
      const barWidth = width / bins;

      histogram.forEach((bar, i) => {
        const barHeight = (bar.y / maxCount) * (height - 10);
        ctx.fillStyle = color;
        ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
      });
    }, [histogram, width, height, color, bins]);

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          background: "#111",
          borderRadius: "8px",
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    );
  }
);

BarChart.displayName = "BarChart";
export default BarChart;
