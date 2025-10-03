import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import { type Task, fetchTasks, addTask, updateStatus, deleteTask, clearAllTasks, filterTasksByStatus } from "./services/service";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskAuthor, setNewTaskAuthor] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("pending");


  // TODO: Fetch tasks from Supabase
  useEffect(() => {
    loadTasks();
  }, []);

// Load tasks
async function loadTasks() {
  try {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Add a task
async function addTaskHandler() {
  if (newTask.trim() === "" || newTaskAuthor.trim() === "") return;

  try {
    const addedTask = await addTask(newTask, newTaskAuthor, newTaskStatus);
    if (addedTask) {
      setTasks((prev) => [...prev, addedTask]);
      setNewTask("");
      setNewTaskAuthor("");
      setNewTaskStatus("pending");
    } else {
      alert("Failed to add task.");
    }
    // refresh list from DB
    await loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Update status
async function updateStatusHandler(id: number, current: Task["status"]) {
  try {
    await updateStatus(id, current);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: current } : task
      )
    );
    await loadTasks();
  } catch (error) {
    console.error("Error updating status:", error);
  }
}

// Delete task
async function deleteTaskHandler(id: number) {
  try {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function clearAllTasksHandler() {
  try {
    await clearAllTasks();
    setTasks([]);
    await loadTasks(); 
  }catch (error) {
    console.error("Error clearing tasks:", error);
  }
}

async function filterTasksHandler(status: Task["status"] | "all") {
  try {
    if (status === "all") {
      await loadTasks();
    } else {
      const filteredTasks = await filterTasksByStatus(status);
      setTasks(filteredTasks);
    }
  } catch (error) {
    console.error("Error filtering tasks:", error);
  }
}

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
  <div className="w-full max-w-5xl flex flex-col items-center gap-6">
    <h1 className="text-3xl font-extrabold text-slate-800">Task Tracker ✅</h1>

    {/* Main row: form + list */}
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Form card */}
      <div
        className="w-full md:w-96 h-[520px] flex flex-col items-center justify-start gap-4 p-6 rounded-2xl
                   bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Add a New Task</h2>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
          className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          value={newTaskAuthor}
          onChange={(e) => setNewTaskAuthor(e.target.value)}
          placeholder="Enter author name..."
          className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value as Task["status"])}
          className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="pending">Pending</option>
          <option value="working">Working</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={addTaskHandler}
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Task
        </button>
        <button
          onClick={clearAllTasksHandler}
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Clear All Tasks
        </button>
        <select
          onChange={(e) => filterTasksHandler(e.target.value as Task["status"] | "all")}
          className="w-full border border-black-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="working">Working</option>  
          <option value="completed">Completed</option>
        </select>
        
        {/* Optional subtle footer note */}
        <p className="mt-auto text-sm text-slate-500">Double-check fields before adding</p>
      </div>

      {/* List card */}
      <div
        className="w-full md:w-96 h-[520px] flex flex-col p-4 rounded-2xl
                   bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 shadow-lg"
      >
        <h3 className="text-lg font-medium text-slate-800 mb-3">Your Tasks</h3>

        {/* scrollable list area */}
        <ul className="w-full overflow-y-auto space-y-3 pr-2"
            style={{ maxHeight: "420px" /* keep inner height consistent across browsers */ }}
        >
          {tasks.length === 0 ? (
            <li className="text-sm text-slate-500">No tasks yet — add one on the left.</li>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateStatus={updateStatusHandler}
                onDelete={deleteTaskHandler}
              />
            ))
          )}
        </ul>
        <div className="mt-auto text-sm text-slate-500">
          Total Tasks: {tasks.length}
          <br />
          Pending: {tasks.filter(t => t.status === "pending").length} | Working: {tasks.filter(t => t.status === "working").length} | Completed: {tasks.filter(t => t.status === "completed").length} 
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default App;
