"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { generateDataPoint, DataPoint } from "@/lib/datGenerator";

interface DataContextType {
  data: DataPoint[];
  aggregatedData: DataPoint[];
  timeRange: string;
  setTimeRange: (range: string) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [aggregatedData, setAggregatedData] = useState<DataPoint[]>([]);
  const [timeRange, setTimeRange] = useState("1m");

  const frameRef = useRef<number>(0);
  const dataRef = useRef<DataPoint[]>([]);
  const lastUpdateRef = useRef<number>(Date.now());
  const lastAggregationRef = useRef<number>(Date.now());
  const running = useRef<boolean>(true);
  const counter = useRef<number>(0);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!running.current) return;

      const newPoints: DataPoint[] = Array.from({ length: 20 }).map(() => {
        const newPoint = generateDataPoint(counter.current++);
        return newPoint;
      });

      dataRef.current.push(...newPoints);

      if (dataRef.current.length > 10000) {
        dataRef.current.splice(0, dataRef.current.length - 10000);
      }
    }, 100);

    return () => clearInterval(updateInterval);
  }, []);

  const loop = useCallback(() => {
    const now = Date.now();

    if (now - lastUpdateRef.current >= 16) {
      setData([...dataRef.current]);
      lastUpdateRef.current = now;
    }

    if (now - lastAggregationRef.current >= 1000) {
      setAggregatedData(aggregateData(dataRef.current, timeRange));
      lastAggregationRef.current = now;
    }

    frameRef.current = requestAnimationFrame(loop);
  }, [timeRange]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      running.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [loop]);

  const resetData = useCallback(() => {
    dataRef.current = [];
    setData([]);
    setAggregatedData([]);
    counter.current = 0;
  }, []);

  const value = useMemo(
    () => ({
      data,
      aggregatedData,
      timeRange,
      setTimeRange,
      resetData,
    }),
    [data, aggregatedData, timeRange, setTimeRange, resetData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

function aggregateData(data: DataPoint[], range: string): DataPoint[] {
  if (data.length === 0) return [];

  const intervalMs =
    range === "1m" ? 60_000 : range === "5m" ? 300_000 : 3_600_000;

  const grouped: Record<number, { sumX: number; sumY: number; count: number }> =
    {};

  for (const d of data) {
    const key = Math.floor(d.timestamp / intervalMs) * intervalMs;
    if (!grouped[key]) grouped[key] = { sumX: 0, sumY: 0, count: 0 };
    grouped[key].sumX += d.x;
    grouped[key].sumY += d.y;
    grouped[key].count++;
  }

  return Object.entries(grouped).map(([timestamp, { sumX, sumY, count }]) => ({
    x: sumX / count,
    y: sumY / count,
    timestamp: Number(timestamp),
  }));
}