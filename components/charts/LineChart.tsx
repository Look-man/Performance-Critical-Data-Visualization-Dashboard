"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import { useData } from "../providers/DataProvider";

type Point = { x: number; y: number };

interface LineChartProps {
  width?: number;
  height?: number;
  color?: string;
  maxPoints?: number;
}

const LineChart: React.FC<LineChartProps> = memo(
  ({ width = 800, height = 400, color = "#00c853", maxPoints = 10000 }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { data } = useData();
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const lastTransform = useRef(transform);

    const visibleData = useMemo(() => {
      if (data.length === 0) return [];
      const start = Math.max(0, data.length - maxPoints);
      return data.slice(start);
    }, [data, maxPoints]);

    const downsample = useCallback((points: Point[], max: number) => {
      if (points.length <= max) return points;
      const step = Math.floor(points.length / max);
      const reduced: Point[] = [];
      for (let i = 0; i < points.length; i += step) {
        reduced.push(points[i]);
      }
      return reduced;
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let animationFrame: number;

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(transform.x, transform.y);
        ctx.scale(transform.scale, transform.scale);

        const points = downsample(visibleData, 2000);
        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, height - points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, height - points[i].y);
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
        animationFrame = requestAnimationFrame(draw);
      };

      animationFrame = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(animationFrame);
    }, [visibleData, width, height, color, transform, downsample]);

    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        setTransform((prev) => ({ ...prev, scale: prev.scale * delta }));
      },
      [setTransform]
    );

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      lastTransform.current = transform;
    }, [transform]);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!isPanning) return;
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        setTransform({
          ...lastTransform.current,
          x: lastTransform.current.x + dx,
          y: lastTransform.current.y + dy,
        });
      },
      [isPanning]
    );

    const handleMouseUp = useCallback(() => setIsPanning(false), []);

    return (
      <div
        style={{
          position: "relative",
          width,
          height,
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            background: "#0b0b0b",
            borderRadius: 8,
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />
        {}
        <svg
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            cursor: isPanning ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        >
          <rect width="100%" height="100%" fill="transparent" />
        </svg>
      </div>
    );
  }
);

LineChart.displayName = "LineChart";
export default LineChart;
