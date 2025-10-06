# 💰 Personal Finance Dashboard

A simple personal finance dashboard built with **React, TypeScript, Tailwind CSS, Recharts, and Supabase**.  
The project is split into two phases:

- **Day 1:** LocalStorage version (offline, single‑user, rapid prototyping)  
- **Day 2:** Supabase extension (cloud database, authentication, multi‑device sync)

---

## 🚩 Final Goal

- Add, view, and delete expenses
- Visual breakdown with charts
- Stats cards for quick insights
- Cloud sync with Supabase + authentication
- Multi‑device support

---

## 📅 Day 1 – LocalStorage Version

### Requirements & Goals

- Local, single‑user finance dashboard
- Persistent data using `localStorage`
- Add, view, and delete expenses
- Visual breakdown with Recharts
- Fast setup with Vite + Tailwind

### Tasks

1. **Project Setup**
   - Create Vite React+TS project
   - Install Recharts, Lucide, date‑fns
   - Install + configure Tailwind CSS

2. **Define Data Model**
   - Create TypeScript interfaces for `Expense` and `Category`

3. **LocalStorage Utilities**
   - Functions for get/save/delete expenses

4. **Custom Hook**
   - `useExpenses` hook for state management and computations

5. **UI Components**
   - Expense form (add expense)
   - Recent expense list (show/delete expenses)
   - Stats cards (“Today”, “This Month”, “Total Expenses”)
   - Category pie chart (Recharts)

6. **Main Dashboard**
   - Layout responsive dashboard with Tailwind
   - Integrate all components

7. **Validation & UI Polish**
   - Add basic form validation
   - Handle empty/edge states
   - Style components for clarity/responsiveness

8. **Testing**
   - Add/delete dummy expenses
   - Check summary and chart
   - Confirm persistence after refresh

---

## 📅 Day 2 – Supabase Migration

### 🎯 Goals

- Move from localStorage to Supabase
- Store expenses + categories in cloud DB
- Add loading/error states
- Prepare for multi‑device use

### ✅ Tasks

1. **Supabase Backend Setup**
   - [x] Create Supabase project
   - [x] Create `categories` + `expenses` tables
   - [x] Disable RLS for dev (or add permissive policies)
   - [x] Seed default categories

2. **Supabase Client Integration**
   - [x] Install `@supabase/supabase-js`
   - [x] Create `supabaseClient.ts`
   - [x] Add `.env` with project URL + anon key

3. **Replace LocalStorage**
   - [x] Update services to call Supabase (`getExpenses`, `insertExpense`, `deleteExpense`, `getCategories`)
   - [x] Update `useExpenses` hook
   - [x] Add `loading` + `error` states

4. **Data Migration**
   - [x] Script to import old localStorage data into Supabase
   - [x] Clear localStorage after migration

5. **UI Enhancements**
   - [x] Form submits directly to Supabase
   - [x] Category dropdown populated from DB
   - [x] Error + loading indicators in UI

6. **Testing**
   - [x] Add/delete expenses → confirm in Supabase
   - [x] Refresh → persistence confirmed
   - [x] Charts + totals use DB data

### 🚀 Outcome

- Expenses + categories now in Supabase
- Multi‑device ready (open access)
- UI shows loading/error states
- Charts and totals computed from live DB data

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS, Recharts
- **Backend/DB:** Supabase (Postgres, Auth, Realtime, Storage)
- **Build Tool:** Vite
- **Utilities:** date‑fns, Lucide icons

---

## ▶️ Getting Started

```bash
# Clone repo
git clone <your-repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Run dev server
npm run dev
