"use client";
import { useState, useEffect, useCallback } from "react";

interface VirtualizationOptions {
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
}

export function useVirtualization({
  itemCount,
  itemHeight,
  viewportHeight,
}: VirtualizationOptions) {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }, []);

  useEffect(() => {
    const container = document.querySelector("[data-virtual-table]");
    if (!container) return;
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const totalHeight = itemCount * itemHeight;
  const start = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const end = Math.min(itemCount, start + visibleCount + 10);
  const offsetY = start * itemHeight;

  return { start, end, offsetY, totalHeight };
}
