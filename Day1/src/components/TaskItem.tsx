import type { Task } from "../App.tsx";

type Props = {
  task: Task;
  onUpdateStatus: (id: number, current: Task["status"]) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onUpdateStatus, onDelete }: Props) {
  return (
    <li className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">
      <span
        onClick={() => onUpdateStatus(task.id, task.status)}
        className={`cursor-pointer ${
          task.status === "completed" ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title} ({task.status})
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  );
}
