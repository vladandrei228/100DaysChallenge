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

## 📅 Day 2 – Supabase Extension

### Requirements & Goals
- Cloud‑based, multi‑device finance dashboard
- User authentication with Supabase Auth
- Expenses stored in Supabase database
- Real‑time updates and multi‑user support

### Tasks
1. **Set Up Supabase Backend**
   - Create Supabase project, get URL and keys
   - Initialize database tables (expenses, users, categories)
   - Configure Row Level Security (RLS) policies

2. **Supabase Client Integration**
   - Add `@supabase/supabase-js` to frontend
   - Set up Supabase client/config file

3. **Authentication**
   - Implement signup/signin/signout flows
   - Add email + social login

4. **Sync Expenses**
   - Replace localStorage utilities with Supabase API calls
   - CRUD: Add, fetch, delete expenses
   - Use Supabase real‑time for live updates

5. **Multi‑User Support**
   - Record which user created each expense
   - Filter expense views by user/session

6. **Data Migration**
   - Import old localStorage data into Supabase
   - Migrate sample/real expenses

7. **UI Enhancements**
   - Show signed‑in user profile/avatar
   - Add loading and error handling
   - Add logout UI and conditional rendering

8. **Cross‑Device Testing**
   - Sign in on two devices
   - Confirm real‑time sync
   - Test expense CRUD and visual summary/chart

---

## 🚀 Bonus Ideas (Optional After Day 2)
- Expense receipt file uploads with Supabase Storage
- Filters: Date range, category, amount
- Mobile PWA support
- Export data as CSV

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
