import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import axios from 'axios';//biblioteca para comunicar o front com o back

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: ''
    //priority: undefined
    //email_user: undefined,
  });

  //pegar do banco
  useEffect(()=>
  {
    pegarTarefas();
  },[]);


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
    addTarefa(title, description, deadline);
  }
    
  //comunicação com o backend
  const enderecoBD = 'http://localhost:5000'

  const pegarTarefas = async () => {
    const response = await axios.get(`${enderecoBD}/Tarefas`) //endereço do banco de 
    setTasks(response.data);
  }

  const addTarefa = async (title, description, deadline) => {
    try {
      const response = await axios.post(`${enderecoBD}/Tarefas`, {
        title,
        description,
        deadline,
        isCompleted: false
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };
  
  const updateTodo = async (id, atributosAtualizacao) =>{
    try
    {
      await axios.patch(`${enderecoBD}/Tarefas/${id}`, atributosAtualizacao);
    }
    catch (error)
    {
      console.error("Falha ao atualizar:", error);
    }
  };

  const deleteTask = async(id) => {
    await axios.delete(`${enderecoBD}/Tarefas/${id}`);
    pegarTarefas(); //atualização da lista
  };

  //fim da comunicação com o backend

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
