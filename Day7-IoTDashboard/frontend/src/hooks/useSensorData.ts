// src/hooks/useSensorData.ts
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { SensorData } from "../utils/types";

type FilterType = "all" | "1h" | "24h" | "7d" | "30d";

export function useSensorData(filter: FilterType) {
  const [data, setData] = useState<SensorData[]>([]);
  const limit = 10;  // Always fetch latest 10 for consistency
  const pollInterval = 30000;

  useEffect(() => {
    async function loadSensorData() {
      let query = supabase
        .from("sensor_data")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      // Apply server-side date filtering for time-based filters
      if (filter !== "all") {
        const now = new Date();
        let ms = 0;
        switch (filter) {
          case "1h":
            ms = 1 * 60 * 60 * 1000;
            break;
          case "24h":
            ms = 24 * 60 * 60 * 1000;
            break;
          case "7d":
            ms = 7 * 24 * 60 * 60 * 1000;
            break;
          case "30d":
            ms = 30 * 24 * 60 * 60 * 1000;
            break;
        }
        const threshold = new Date(now.getTime() - ms).toISOString();
        query = query.gte("created_at", threshold);
      }

      const { data: fetchedData, error } = await query;
      if (error) {
        console.error("Supabase query error:", error);
      }
      if (fetchedData) setData(fetchedData);
    }

    loadSensorData();

    const pollIntervalId = setInterval(loadSensorData, pollInterval);

    // Real-time subscription with proper filter format
    let realtimeFilter = "";
    if (filter !== "all") {
      const now = new Date();
      let ms = 0;
      switch (filter) {
        case "1h":
          ms = 1 * 60 * 60 * 1000;
          break;
        case "24h":
          ms = 24 * 60 * 60 * 1000;
          break;
        case "7d":
          ms = 7 * 24 * 60 * 60 * 1000;
          break;
        case "30d":
          ms = 30 * 24 * 60 * 60 * 1000;
          break;
      }
      const threshold = new Date(now.getTime() - ms).toISOString();
      realtimeFilter = `created_at=gte.${threshold}`;
    }

    const channel = supabase
      .channel("realtime:sensor_data")
      .on(
        "postgres_changes",
        { 
          event: "INSERT", 
          schema: "public", 
          table: "sensor_data",
          filter: realtimeFilter  // Proper format: 'column=operator.value'
        },
        (payload) => {
          const newEntry = payload.new as SensorData;
          setData((prev) => {
            // Prepend new entry and keep only latest 10
            const updated = [newEntry, ...prev.filter((item) => item.id !== newEntry.id)];
            return updated.slice(0, limit);
          });
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error('Realtime subscription error');
        }
      });

    return () => {
        clearInterval(pollIntervalId);
      supabase.removeChannel(channel);
    };
  }, [filter, limit, pollInterval]);

  return data;
}