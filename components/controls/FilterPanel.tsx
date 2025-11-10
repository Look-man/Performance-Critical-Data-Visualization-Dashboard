"use client";
import React, { memo, useState, useCallback } from "react";
import { useData } from "../providers/DataProvider";

interface FilterPanelProps {
  onFilterChange?: (range: [number, number]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = memo(({ onFilterChange }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const { data } = useData();

  const handleApply = useCallback(() => {
    onFilterChange?.([minValue, maxValue]);
  }, [minValue, maxValue, onFilterChange]);

  return (
    <div className="p-4 bg-[#1e1e1e] rounded-2xl shadow-md flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-white">Data Filter</h3>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <label>
          Min:
          <input
            type="number"
            className="ml-2 w-20 bg-[#2c2c2c] text-white p-1 rounded"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            className="ml-2 w-20 bg-[#2c2c2c] text-white p-1 rounded"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
          />
        </label>
      </div>
      <button
        onClick={handleApply}
        className="mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
      >
        Apply
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Current dataset: {data.length.toLocaleString()} points
      </p>
    </div>
  );
});

FilterPanel.displayName = "FilterPanel";
export default FilterPanel;
