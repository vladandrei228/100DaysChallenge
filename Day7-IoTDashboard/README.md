# 🌡️ IoT LiveSense Dashboard

A real-time IoT dashboard built with **React (Vite + TypeScript)**, **TailwindCSS**, **Supabase**, and a **Node.js backend simulator**.  
The project simulates IoT devices sending temperature and humidity data, stores it in Supabase, and displays it live on a responsive frontend dashboard.

---

## 📌 Problem Statement

IoT devices often generate continuous streams of sensor data (e.g., temperature, humidity).  
Your task is to build a **real-time dashboard** that:

- Collects simulated IoT sensor data (temperature & humidity) via a Node.js backend.
- Stores the data in **Supabase**.
- Displays the latest readings in a **React + Tailwind** frontend.
- Updates the UI in **real-time** as new data arrives.

The challenge emphasizes **frontend design and real-time interactivity**, while keeping the backend lightweight.

---

## ✅ Tasks

### 1: Backend (Node.js + Supabase)

- [ DONE ] Create a Supabase table `sensor_data` with fields:
  - `id` (uuid, primary key)
  - `created_at` (timestamp)
  - `temperature` (float)
  - `humidity` (float)
- [ DONE ] Write a Node.js script that:
  - Connects to Supabase
  - Every 5 seconds inserts a random temperature (15–30°C) and humidity (30–70%)
  - Runs continuously to simulate IoT devices

---

### 2: Frontend (React + Vite + Tailwind + Supabase + TypeScript)

- [ DONE ] Set up a React project with Vite (`vite@latest --template react-ts`)
- [ DONE ] Configure TailwindCSS for styling
- [ DONE ] Connect to Supabase client
- [ DONE ] Fetch all the sensors, and display 10 at a time
- [ DONE ] Subscribe to Supabase real-time changes (`INSERT` events)
- [ DONE ] Display readings in a **styled table**
- [ DONE ] Add a **live-updating chart** (temperature & humidity trends over time)

---

## 🚀 Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Stretch Goals

- Add filtering (e.g., show last 1h, 24h, 7d of data)

- Improve UI with Tailwind components (cards, charts, dark mode)

---

## 🛠️ Tech Stack

- Frontend: React (Vite + TypeScript), TailwindCSS, Supabase client

- Backend: Node.js, Supabase SDK

- Database: Supabase (Postgres + Realtime)

---

## 📚 Learning Outcomes

By completing this project you will:

- Practice building a **frontend-heavy React app** with Vite + TypeScript
- Gain experience with **real-time data streams** using Supabase
- Strengthen your **UI/UX design skills** with TailwindCSS
- Simulate IoT device data with a lightweight **Node.js backend**
- Learn how to structure a small full‑stack project from scratch

---

## 🤝 Contributing

This project is part of a **100 Days of Problem Solving Challenge**.  
If you’d like to suggest improvements, feel free to fork the repo, open issues, or submit pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
