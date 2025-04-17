import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  //const email_user = localStorage.getItem("email");
  const token = localStorage.getItem("token")
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    },
  };

  //pegar do banco
  useEffect(() => {
    pegarTarefas();
  }, []);

  async function onTaskClick(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        updateTodo(taskId, { isCompleted: updatedTask.isCompleted },config); //atualização no back
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    deleteTask(taskId);
  }

  function onAddTaskSubmit(title, description, deadline) {
    addTarefa(title, description, deadline);
  }

  //PRECISA ADICIONAR FILTRO POR USER_EMAIL
  const pegarTarefas = async () => {
    const response = await api.get("/Tarefas", config);
    const tasksWithNormalId = response.data.map((_task) => ({
      ..._task,
      id: _task._id,
    })); //quando eu pego do banco o "id" se chama "_id", eu tenha eu tenho que mudar o nome desse atributo
    setTasks(tasksWithNormalId);
  };

  const addTarefa = async (title, description, deadline) => {
    try {
      const response = await api.post("Tarefas", {
        title,
        description,
        deadline,
        isCompleted: false,
      },config);
      const taskWithNormalId = { ...response.data, id: response.data._id }; //normalização do id
      setTasks([...tasks, taskWithNormalId]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const updateTodo = async (id, atributosAtualizacao, config) => {
    try {
      await api.put(`/Tarefas/${id}`, atributosAtualizacao, config);
    } catch (error) {
      console.error("Falha ao atualizar:", error);
    }
  };

  const deleteTask = async (id) => {
    await api.delete(`/Tarefas/${id}`);
    pegarTarefas();
  };

  return (
    <div className="h-screen w-screen bg-slate-500 flex items-center justify-center p-6">
      <div className="w-[800px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <div className="flex gap-4 justify-center">
          <div className="w-[50%] min-h-[300px] ">
            <p className="text-2xl text-slate-100 font-bold text-center">
              A fazer
            </p>
            <div className="max-h-[500px] overflow-y-auto">
              <Tasks
                tasks={tasks.filter((task) => !task.isCompleted)}
                onTaskClick={onTaskClick}
                onDeleteTaskClick={onDeleteTaskClick}
              />
            </div>
          </div>
          <div className="w-[50%] min-h-[300px]">
            <p className="text-2xl text-slate-100 font-bold text-center">
              Concluidas
            </p>
            <div className="max-h-[500px] overflow-y-auto">
              <Tasks
                tasks={tasks.filter((task) => task.isCompleted)}
                onTaskClick={onTaskClick}
                onDeleteTaskClick={onDeleteTaskClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
