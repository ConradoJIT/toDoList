import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        className="border border-slate-400 outline-slate-400 px-4 py-2 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="border border-slate-400 outline-slate-400 px-4 py-2 rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Preencha os campos");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
