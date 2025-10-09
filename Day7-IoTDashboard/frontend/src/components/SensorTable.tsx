// src/components/SensorTable.tsx
import type { SensorData } from "../utils/types";

type FilterType = "all" | "1h" | "24h" | "7d" | "30d";

interface SensorTableProps {
  data: SensorData[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export function SensorTable({ data, filter, setFilter }: SensorTableProps) {
  return (
    <div className="metric-card w-full max-w-4xl mb-8 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gold-200">Latest 10 Sensor Readings</h2>
        <div className="space-x-2">
          <button
            className={`alert-button ${filter === "all" ? "bg-gold-600" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`alert-button ${filter === "1h" ? "bg-gold-600" : ""}`}
            onClick={() => setFilter("1h")}
          >
            1 Hour
          </button>
          <button
            className={`alert-button ${filter === "24h" ? "bg-gold-600" : ""}`}
            onClick={() => setFilter("24h")}
          >
            24 Hours
          </button>
          <button
            className={`alert-button ${filter === "7d" ? "bg-gold-600" : ""}`}
            onClick={() => setFilter("7d")}
          >
            7 Days
          </button>
          <button
            className={`alert-button ${filter === "30d" ? "bg-gold-600" : ""}`}
            onClick={() => setFilter("30d")}
          >
            30 Days
          </button>
        </div>
      </div>
      <table className="table-auto border-collapse border border-black-500 w-full">
        <thead>
          <tr className="bg-black-700">
            <th className="border border-black-500 px-4 py-2 text-gold-300">Time</th>
            <th className="border border-black-500 px-4 py-2 text-gold-300">Temperature (°C)</th>
            <th className="border border-black-500 px-4 py-2 text-gold-300">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-black-600">
              <td className="border border-black-500 px-4 py-2 text-white">
                {new Date(row.created_at).toLocaleTimeString()}
              </td>
              <td className="border border-black-500 px-4 py-2 text-white">{row.temperature}</td>
              <td className="border border-black-500 px-4 py-2 text-white">{row.humidity}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="border border-black-500 px-4 py-2 text-center text-black-300">
                No data available for the selected filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}