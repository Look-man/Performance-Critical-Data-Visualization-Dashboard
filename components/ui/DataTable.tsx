"use client";
import React, { useMemo, memo } from "react";
import { useData } from "../providers/DataProvider";
import { useVirtualization } from "@/hooks/useVirtualization";

interface DataTableProps {
  height?: number;
  rowHeight?: number;
}

const DataTable: React.FC<DataTableProps> = memo(
  ({ height = 300, rowHeight = 28 }) => {
    const { data } = useData();
    const { start, end, offsetY, totalHeight } = useVirtualization({
      itemCount: data.length,
      itemHeight: rowHeight,
      viewportHeight: height,
    });

    const visibleRows = useMemo(
      () => data.slice(start, end),
      [data, start, end]
    );

    return (
      <div
        className="bg-[#141414] rounded-2xl overflow-auto text-gray-200 text-xs font-mono"
        style={{ height }}
      >
        <div
          style={{
            height: totalHeight,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: offsetY,
              left: 0,
              right: 0,
            }}
          >
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-[#1f1f1f] text-gray-400">
                <tr>
                  <th className="py-1 px-2 text-left">#</th>
                  <th className="py-1 px-2 text-left">X</th>
                  <th className="py-1 px-2 text-left">Y</th>
                  <th className="py-1 px-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 ? "bg-[#1a1a1a]" : "bg-[#121212]"}
                  >
                    <td className="py-1 px-2">{start + i}</td>
                    <td className="py-1 px-2">{row.x.toFixed(2)}</td>
                    <td className="py-1 px-2">{row.y.toFixed(2)}</td>
                    <td className="py-1 px-2">
                      {new Date(row.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
export default DataTable;
