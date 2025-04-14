import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Usuarios/logging", { email, senha });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao fazer login");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
      <h1 className="text-2xl font-bold text-center mb-2">Login</h1>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm mb-1">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="senha" className="text-sm mb-1">
          Senha
        </label>
        <input
          type="password"
          id="senha"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className=" bg-stone-600 text-white px-4 py-2 rounded-md hover:bg-slate-600"
      >
        Entrar
      </button>
      {/* Mensagem de erro */}
      {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

      <p className="text-sm text-center mt-2">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="text-slate-700 font-semibold hover:underline"
        >
          Registrar-se
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
