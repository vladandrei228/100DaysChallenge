import dotenv = require("dotenv");
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getRandomDate() {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - 30);

    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    return new Date(randomTime).toISOString();
}

async function insertSensorData() {
  const temperature = (Math.random() * 15 + 15).toFixed(2);
  const humidity = (Math.random() * 40 + 30).toFixed(2);

  const { error } = await supabase.from("sensor_data").insert([
    { temperature, humidity },
  ]);

  if (error) console.error("Insert error:", error.message);
  else console.log(`Inserted: T=${temperature}°C, H=${humidity}%`);
}

setInterval(insertSensorData, 30000);
