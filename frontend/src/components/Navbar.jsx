import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function onLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">To-do List</div>

      <div className="flex items-center gap-4">
        <span>
          Olá, <span className="font-bold">{"Nome usuario"}</span>
        </span>

        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          onClick={onLogout}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
