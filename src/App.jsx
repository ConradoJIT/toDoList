import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10"
  //     );
  //     const data = await response.json();
  //     setTasks(data);
  //   }
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description, deadline) {
    const newTask = {
      id: v4(),
      title,
      description,
      deadline,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    console.log(newTask);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex items-center justify-center p-6">
      <div className="w-[800px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <div className="flex gap-4 justify-center">
          <div className="w-[50%] min-h-[300px]">
            <p className="text-2xl text-slate-100 font-bold text-center">
              A fazer
            </p>
            <Tasks
              tasks={tasks.filter((task) => !task.isCompleted)}
              onTaskClick={onTaskClick}
              onDeleteTaskClick={onDeleteTaskClick}
            />
          </div>
          <div className="w-[50%] min-h-[300px]">
            <p className="text-2xl text-slate-100 font-bold text-center">
              Concluidas
            </p>
            <Tasks
              tasks={tasks.filter((task) => task.isCompleted)}
              onTaskClick={onTaskClick}
              onDeleteTaskClick={onDeleteTaskClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
