// src/App.tsx
import { useState } from "react";
import { SensorTable } from "./components/SensorTable";
import { SensorChart } from "./components/SensorChart";
import { useSensorData } from "./hooks/useSensorData";

type FilterType = "all" | "1h" | "24h" | "7d" | "30d";

function App() {
  const [filter, setFilter] = useState<FilterType>("all");
  const data = useSensorData(filter);  // Fetches latest 10 based on filter

  return (
    <div className="dashboard-bg min-h-screen flex flex-col items-center p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gold-300">🌡️ IoT Sensor Dashboard</h1>
      </header>
      <div className="flex flex-col-1 md:flex-col-2 gap-4 w-full">
        <SensorTable data={data} filter={filter} setFilter={setFilter} />
        <SensorChart data={data} />
      </div>  
    </div>
  );
}

export default App;