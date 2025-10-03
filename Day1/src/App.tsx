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
  author: string;
  status: "pending" | "working" | "completed";
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskAuthor, setNewTaskAuthor] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("pending");

  // TODO: Fetch tasks from Supabase
  useEffect(() => {
    fetchTasks();
  }, []);

  // TODO: Implement fetchTasks()
  async function fetchTasks() {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
  }

  // TODO: Implement addTask()
  async function addTask() {
    if (!newTask.trim() || !newTaskAuthor.trim()) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title: newTask, author: newTaskAuthor, status: "pending" }])
      .select()
      .single();

      if(error) {
        console.error("Error adding task:", error);
      } else if(data) {
        setTasks((prev) => [...prev, data]);
        setNewTask("");
        setNewTaskAuthor("");
        setNewTaskStatus("pending");
      }

    // After adding, fetch the updated list
    await fetchTasks(); 
  }

  // TODO: Implement updateStatus()
  async function updateStatus(id: number, current: Task["status"]) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: current })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating status:", error);
    } else if (data) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status: current } : task))
      );
    }
    
    // After updating, fetch the updated list
    await fetchTasks();
  }

  // TODO: Implement deleteTask()
  async function deleteTask(id: number) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if(error){
      console.error("Error deleting task:", error);
    }else{
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    // After deleting, fetch the updated list
    await fetchTasks();
  }

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
        <input
          type="text"
          value={newTaskAuthor}
          onChange={(e) => setNewTaskAuthor(e.target.value)}
          placeholder="Enter author name..."
          className="border rounded px-3 py-2"
        />
        <select
          value={newTaskStatus}
          onChange={(e) =>
            setNewTaskStatus(e.target.value as Task["status"])
          }
          className="border rounded px-3 py-2"
        >
          <option value="" disabled>Select status</option>
          <option value="pending">Pending</option>
          <option value="working">Working</option>
          <option value="completed">Completed</option>
        </select>
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
