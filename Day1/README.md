# Day 1 – Task Tracker App

## 📌 Challenge
Build a simple **Task Tracker App** where users can:
- Add tasks  
- Mark tasks as complete  
- Delete tasks  

### Twist
- Store tasks in **Supabase** so they persist across refreshes  
- Use **React + Tailwind** for the UI  
- Use **TypeScript** for type safety  

---

## ✅ Tasks for Day 1

### 🔹 Database Setup (Supabase)
- [ DONE ] Create a new Supabase project  
- [ DONE ] Define an ENUM type for task status with values: `pending`, `working`, `completed`  
- [ DONE ] Create a `tasks` table with fields: `id`, `title`, `status` (default: `pending`)  
- [ DONE ] Enable Row Level Security (RLS)  
- [ DONE ] Add policies to allow public read/write (no authentication for Day 1)  

---

### 🔹 Frontend Setup (React + Tailwind + TypeScript)
- [ DONE ] Initialize a Vite project with React + TypeScript  
- [ DONE ] Install dependencies: `@supabase/supabase-js`, `tailwindcss` 
- [ DONE ] Configure Tailwind in `vite.config.js` and add it to `index.css`  
- [ DONE ] Create a `.env` file with Supabase URL and anon key  

---

### 🔹 Core Features to Implement
- [ DONE ] **fetchTasks()** → Load tasks from Supabase and display them  
- [ DONE ] **addTask()** → Insert a new task with default status `pending`  
- [ DONE ] **updateStatus()** → Cycle a task’s status: `pending → working → completed → pending`  
- [ DONE ] **deleteTask()** → Remove a task from Supabase  

---

### 🔹 UI / UX
- [ DONE ] Input field + “Add” button to create tasks  
- [ DONE ] Task list showing all tasks with their current status  
- [ DONE ] Click on a task to cycle its status  
- [ DONE ] Delete button (❌) to remove a task  
- [ DONE ] Style with Tailwind (bonus: use colored badges for status)  

---

### 🔹 Stretch Goals (Optional)
- [ ] Add a filter (show only pending / working / completed)  
- [ ] Add a counter (e.g., “3 tasks pending”)  
- [ ] Add simple animations for task transitions  


---

## 🛠️ Tech Stack
- React.js  
- Tailwind CSS  
- Supabase  
- Node.js  
- TypeScript  

---

## 🚀 Installation & Setup

1. Navigate to this folder:
   ```bash
   cd Day1
2. Initialize a new project with Vite + TS
    ```bash
    npm create vite@latest . react-ts
3. Install dependencies
    ```bash
    npm install
4. Setup Tailwind (follow the tutorial from their website)
5. Add Supabase credentials in .env
6. Run the project
    ```bash
    npm run dev