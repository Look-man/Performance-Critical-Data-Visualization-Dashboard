"use client";
import { useEffect, useState, useRef } from "react";
import { generateDataPoint } from "@/lib/datGenerator";
import { DataPoint } from "@/lib/types";

export function useDataStream(initialCount = 10000, interval = 100) {
  const [data, setData] = useState<DataPoint[]>(() =>
    Array.from({ length: initialCount }, (_, i) => generateDataPoint(i))
  );
  const idRef = useRef(initialCount);

  useEffect(() => {
    const id = setInterval(() => {
      idRef.current++;
      const newPoint = generateDataPoint(idRef.current);
      setData((prev) => {
        const next = [...prev, newPoint];
        if (next.length > 10000) next.shift();
        return next;
      });
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return data;
}
