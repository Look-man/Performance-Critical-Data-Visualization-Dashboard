"use client";
import React, { useEffect, useRef, memo, useMemo } from "react";
import { useData } from "../providers/DataProvider";

interface HeatmapProps {
  width?: number;
  height?: number;
  binsX?: number;
  binsY?: number;
}

const Heatmap: React.FC<HeatmapProps> = memo(
  ({ width = 800, height = 400, binsX = 50, binsY = 25 }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { data } = useData();

    const heatmapGrid = useMemo(() => {
      const grid = Array.from({ length: binsY }, () => new Array(binsX).fill(0));
      if (!data || data.length === 0) return grid;

      const xs = data.map((d) => d.x);
      const ys = data.map((d) => d.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;

      for (const d of data) {
        const gx = Math.floor(((d.x - minX) / rangeX) * (binsX - 1));
        const gy = Math.floor(((d.y - minY) / rangeY) * (binsY - 1));

        if (gx >= 0 && gx < binsX && gy >= 0 && gy < binsY) {
          grid[gy][gx]++;
        }
      }

      return grid;
    }, [data, binsX, binsY]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const flatGrid = Array.isArray(heatmapGrid) ? heatmapGrid.flat() : [];
      const maxVal = Math.max(...flatGrid, 1);
      const cellW = width / binsX;
      const cellH = height / binsY;

      for (let y = 0; y < binsY; y++) {
        const row = heatmapGrid[y];
        if (!row) continue;
        for (let x = 0; x < binsX; x++) {
          const val = (row[x] ?? 0) / maxVal;
          const hue = 240 - val * 240;
          ctx.fillStyle = `hsl(${hue}, 100%, ${30 + val * 30}%)`;
          ctx.fillRect(x * cellW, height - (y + 1) * cellH, cellW, cellH);
        }
      }
    }, [heatmapGrid, width, height, binsX, binsY]);

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          background: "#0f0f0f",
          borderRadius: 8,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
);

Heatmap.displayName = "Heatmap";
export default Heatmap;