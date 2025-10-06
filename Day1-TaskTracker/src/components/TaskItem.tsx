import type { Task } from "../services/service";

type Props = {
  task: Task;
  onUpdateStatus: (id: number, current: Task["status"]) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onUpdateStatus, onDelete }: Props) {
  return (
    <li className={` flex justify-between items-center p-3 mb-2 rounded shadow 
        ${task.status === "completed" ? "line-through text-gray-400 bg-green-100" : task.status === "working" ? "bg-yellow-100" : "bg-red-100" } `}>
        <div>
            <span className="font-semibold break-words">
                Task: {task.title}
            </span>
            <br />
            <span className="text-sm italic text-gray-600 break-words mr-4"> 
            Author: {task.author}
            </span>
        </div>
        <div>
            <select
            title="Status"
        value={task.status}
        onChange={(e) => onUpdateStatus(task.id, e.target.value as Task["status"])}
        className= "border rounded px-2 py-1 mr-4"       >
        <option value="pending">Pending</option>
        <option value="working">Working</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
        </div>
      
    </li>
  );
}
