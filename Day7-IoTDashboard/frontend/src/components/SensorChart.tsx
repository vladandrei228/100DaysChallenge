// src/components/SensorChart.tsx
import type { SensorData } from "../utils/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SensorChartProps {
  data: SensorData[];
}

export function SensorChart({ data }: SensorChartProps) {
  // Use the provided data (already latest 10 filtered)
  const chartData = [...data].reverse().map((row) => ({
    time: new Date(row.created_at).toLocaleTimeString(),
    temperature: row.temperature,
    humidity: row.humidity,
  }));

  return (
    <div className="metric-card w-full max-w-4xl h-[500px] mb-8 p-10 mx-auto">
      <h2 className="text-xl font-semibold text-gold-200 mb-4">Latest Sensor Data Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-black-500)" />
          <XAxis dataKey="time" stroke="var(--color-gold-300)" />
          <YAxis stroke="var(--color-gold-300)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-black-700)",
              border: "1px solid var(--color-gold-500 / 20%)",
              color: "var(--color-white)",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="var(--color-gold-400)" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="humidity" stroke="var(--color-gold-600)" />
        </LineChart>
      </ResponsiveContainer>
      {data.length === 0 && (
        <p className="text-center text-black-300 mt-4">No data to display for the selected filter.</p>
      )}
    </div>
  );
}