"use client";
import React, { memo } from "react";

interface TimeRangeSelectorProps {
  value: string;
  onChange: (range: string) => void;
}

const ranges = [
  { label: "1 min", value: "1m" },
  { label: "5 min", value: "5m" },
  { label: "1 hour", value: "1h" },
];

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = memo(
  ({ value, onChange }) => {
    return (
      <div className="p-3 bg-[#1e1e1e] rounded-2xl shadow-md flex gap-3 items-center">
        <span className="text-gray-300 text-sm">Time Range:</span>
        {ranges.map((r) => (
          <button
            key={r.value}
            onClick={() => onChange(r.value)}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              value === r.value
                ? "bg-blue-600 text-white"
                : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3a3a3a]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    );
  }
);

TimeRangeSelector.displayName = "TimeRangeSelector";
export default TimeRangeSelector;
