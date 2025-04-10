import { ChevronRightIcon, DeleteIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

//props
function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    //const query = new URLSearchParams();
    //query.set("title", task.title);
    //query.set("description", task.description);
    //navigate(`/tasks?${query.toString()}`);
    navigate(`/task?title=${task.title}&description=${task.description}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-left text-white p-2 rounded-md w-full break-words overflow-auto ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.title}
            <p className="text-slate-300">Prazo: {task.deadline}</p>
          </button>
          <button
            type="button"
            onClick={() => onSeeDetailsClick(task)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <ChevronRightIcon></ChevronRightIcon>
          </button>
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <DeleteIcon></DeleteIcon>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
