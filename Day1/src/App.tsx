import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import TaskItem from "./components/TaskItem";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export type Task = {
  id: number;
  title: string;
  status: "pending" | "working" | "completed";
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // TODO: Fetch tasks from Supabase
  useEffect(() => {
    // fetchTasks();
  }, []);

  // TODO: Implement fetchTasks()
  async function fetchTasks() {}

  // TODO: Implement addTask()
  async function addTask() {}

  // TODO: Implement updateStatus()
  async function updateStatus(id: number, current: Task["status"]) {}

  // TODO: Implement deleteTask()
  async function deleteTask(id: number) {}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Task Tracker ✅</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
          className="border rounded px-3 py-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={updateStatus}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
