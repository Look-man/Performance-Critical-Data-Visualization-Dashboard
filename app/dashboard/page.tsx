"use client";

import React, { useState } from "react";

import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import ScatterPlot from "@/components/charts/ScatterPlot";
import Heatmap from "@/components/charts/Heatmap";
import FilterPanel from "@/components/controls/FilterPanel";
import TimeRangeSelector from "@/components/controls/TimeRangeSelector";
import DataTable from "@/components/ui/DataTable";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import { DataProvider } from "@/components/providers/DataProvider";

export default function DashboardPage() {
  const [range, setRange] = useState("1m");

  return (
    <DataProvider>
      <main className="min-h-screen bg-[#0f0f0f] text-white p-6 space-y-6">
        {/* ---- Header ---- */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-semibold text-blue-400">
            📊 Real-Time Performance Dashboard
          </h1>
          <div className="flex gap-4">
            <FilterPanel onFilterChange={() => {}} />
            <TimeRangeSelector value={range} onChange={setRange} />
          </div>
        </header>

        {/* ---- Charts Grid ---- */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            { title: "Line Chart (Real-time)", Component: LineChart },
            { title: "Bar Chart", Component: BarChart },
            { title: "Scatter Plot", Component: ScatterPlot },
            { title: "Heatmap", Component: Heatmap },
          ].map(({ title, Component }, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg flex flex-col justify-between h-[320px] overflow-hidden"
            >
              <h2 className="text-sm text-gray-400 mb-2">{title}</h2>
              <div className="flex-1 w-full h-full">
                <Component />
              </div>
            </div>
          ))}

          {/* Data Table */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg flex flex-col col-span-1 md:col-span-2 xl:col-span-3">
            <h2 className="text-sm text-gray-400 mb-2">Data Table</h2>
            <DataTable height={300} />
          </div>
        </section>

        <PerformanceMonitor />
      </main>
    </DataProvider>
  );
}
